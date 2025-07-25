import React, { useState } from 'react';

import loginImg from '../../assets/Mobile login-pana.png'
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../api/utilities';
import toast from 'react-hot-toast';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate();

   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    setLoading,
  } = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const password=form.password.value;
    const image=form.image.files[0]

    console.log(name,email,password);
    try {
        //
        setLoading(true)
        const image_url=await imageUpload(image);
        console.log(image_url);
        
        const result=await createUser(email, password)
        console.log(result);

        //save username and photo in firebase
        await updateUserProfile(name, image_url)
        navigate('/')
        toast.success('sign up successfully')

        
        
        
    } catch (err) {
        //
      console.log(err)
      toast.error(err.message)
      setLoading(false)
        
    }

    
  


  };

 

  const handleGoogleLogin=async()=>{
    try {
      setLoading(true)
      await signInWithGoogle()
      navigate('/')
      toast.success('Login Successfull')

      
    } catch (error) {
      //
      toast.error(error.message)
      setLoading(false)

      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] p-2 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Left Side: Image - Hidden by default (on small screens), visible from medium screens (md:flex) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] items-center justify-center ">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full h-auto  object-cover "
          />
        </div>

        {/* Right Side: Login Form - Takes full width on small screens, half width from medium screens */}
        <div className="w-full bg-[#eaa60817]  md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sign Up!</h2>
          <p className="text-gray-600 text-center mb-8">Sign up to see exciting products.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="text"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
                
              />
            </div>
            {/* Photo field */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <input
              required
                type="file"
                 id='image'
                name='image'
                accept='image/*'
                
                
                className="mt-1 block w-full px-4 py-2  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
                
              />
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-900 focus:outline-none" // Removed focus:ring-2 and focus:ring-offset-2 focus:ring-blue-500
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.879 16.121A4.95 4.95 0 0112 17c2.485 0 4.5-2.015 4.5-4.5 0-.663-.145-1.295-.414-1.875m-.004-3.585A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.07 10.07 0 01-1.563 3.029m-5.858-.908a3 3 0 11-4.243-4.243" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center "> {/* Changed justify-between to justify-end */}
              {/* Removed the "Remember me" checkbox and label */}

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
          
               {/* Google */}
<button onClick={handleGoogleLogin}  className="btn my-3 bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to={'/login'} href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;