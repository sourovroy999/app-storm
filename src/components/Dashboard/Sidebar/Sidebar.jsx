import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BsGraphUp } from 'react-icons/bs'


import { AiOutlineBars } from 'react-icons/ai'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
// import MenuItem from './Menu/MenuItem';
import GuestMenu from './GuestMenu';
import ModeratorMenu from './Menu/Moderator/ModeratorMenu';
import AdminMenu from './Menu/Admin/AdminMenu';
import useRole from '../../../hooks/useRole';


const Sidebar = () => {
  const { logOut } = useAuth()

  const [isActive, setActive] = useState(false)

  const navigate=useNavigate()



  const [role, isLoading]=useRole();
//   if (isLoading) {
//   return <p className="text-center p-4">Loading...</p>;
// }
  console.log(role, isLoading);

  
  // const [toggle, setToggle]=useState(true)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  // const toggleHandler=(event)=>{
  //   setToggle(event.target.checked)
    

  // }

  const handleLogOut=async()=>{
    await logOut();
    navigate('/login');
    toast.success("LogOut Successfull")

  }

    
    return (
        <>
        {/* small screenn navabr */}
      <nav className="navbar flex items-center justify-between px-6 md:px-10  bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 text-white border-b border-purple-500/30">
      
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent hover:from-cyan-300 hover:to-pink-300 transition-all duration-300"
        >
          AppStorm
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={handleToggle}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>
    </nav>

        {/* sidebar */}

         <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center -auto'>
            
 <Link
          to="/"
          className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent hover:from-cyan-300 hover:to-pink-300 transition-all duration-300"
        >
          AppStorm
        </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            

            {/*  Menu Items */}
            <nav>
              
             

              {/* guest menu */}
              {
                role ==='guest' && <GuestMenu/>
              }
              {
                role === 'moderator' && 
              <ModeratorMenu/>

              }

              {
                role==='admin' && <AdminMenu/>
              }


        

            


            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          {/* <MenuItem label={'Profile'} address={'/dashboard/profile'} icon={FcSettings}/> */}

          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            {/* <GrLogout className='w-5 h-5' /> */}

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>



            
        </>
    );
};

export default Sidebar;