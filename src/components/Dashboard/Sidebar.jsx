import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { AiOutlineBars } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';


const Sidebar = () => {
     const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  const navigate=useNavigate()

//   const [role, isLoading]=useRole();
//   console.log(role, isLoading);
  
  const [toggle, setToggle]=useState(true)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const toggleHandler=(event)=>{
    setToggle(event.target.checked)
    

  }

  const handleLogOut=async()=>{
    await logOut();
    navigate('/login');
    toast.success("LogOut Successfull")

  }

    
    return (
        <>
        {/* small screenn navabr */}
        <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
            <div>
                  <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
            <p >AppStorm</p>
              {/* <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              /> */}
            </Link>
          </div>
            </div>

                    <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
        </div>


        {/* sidebar */}

            
        </>
    );
};

export default Sidebar;