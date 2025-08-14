import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
import { reload } from 'firebase/auth'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    })
    return signOut(auth)
  }

// const updateUserProfile = async (name, photo) => {  
//   try {
//     // Update Firebase profile
//     await updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });

//     // Create updated user object
//     const updatedUser = {
//       ...auth.currentUser,
//       displayName: name,
//       photoURL: photo
//     };

//     // Update local state
//     setUser(updatedUser);

//     // Save updated user to database
//     await saveUser(updatedUser);

//     return true;
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     throw error;
//   }
// }



const updateUserProfile = async (name, photo) => {  
  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    // Force refresh from Firebase server
    await reload(auth.currentUser);

    const updatedUser = {
      ...auth.currentUser,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL
    };

    setUser(updatedUser);
    await saveUser(updatedUser);

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


  // Get token from server
  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    )
    return data
  }

 const saveUser = async user => {
  // Don't save if essential data is missing
  console.log(user);
  
  if (!user?.email) {
    console.log('No email found, skipping user save');
    return;
  }

  const currentUser = {
    email: user?.email,
    name: user?.displayName || 'Unknown User', // Handle null displayName
    photoURL: user?.photoURL || '', // Handle null photoURL
    role: 'guest',
    status: 'unverified',
  }

  console.log('Saving user data:', currentUser);

  try {
    const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
    return data;
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

  

  // onAuthStateChange
 

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
        getToken(currentUser.email)
        saveUser(currentUser)
        console.log('currrent user->', currentUser);
        
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])


  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider
