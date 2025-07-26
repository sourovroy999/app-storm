import React from 'react';
import useAuth from '../../../../../hooks/useAuth';

const MyProfile = () => {
    const{user}=useAuth()
    return (
        <div>
            <img src={user?.photoURL} alt="" />
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>

            
        </div>
    );
};

export default MyProfile;