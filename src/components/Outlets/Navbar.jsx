import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import HostModal from '../Modal/HostRequestModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Navbar = () => {

  const {user ,logOut}=useAuth()
  console.log(user);

  // const[isOpen, setIsOpen]=useState(false)

  // const axiosSecure=useAxiosSecure()

  //for modal

  const [isModalOpen, setIsModalOpen]=useState(false)

  const closeModal=()=>{
    setIsModalOpen(false)
  }

  const ModalHandler=async()=>{
    closeModal()

    console.log('i want to be a host');

    // try{
    //   const currentUser={
    //     email:user?.email,
    //     role:'guest',
    //     staus:'Requested'
    //   }
    //   const {data}=await axiosSecure.put('/user', currentUser)
    //   console.log(data);
    //    if(data.modifiedCount>0){
    //       toast.success('Request to be host has been sent! please wait for admin approval')
    //      }
    //      else{
    //       toast.error('please wait for admin approval')
    //      }

      
    // } catch (error) {
    //   //
    //   console.log(error);
    //   toast.error(error.message)
      
    // } finally{
    //   closeModal()
    // }

    

  }



  
  const navigate=useNavigate()



  const handleLogOut=async()=>{
    try {
    await logOut()
    navigate('/login')
    toast.success('Logged Out Successfull')
      
    } catch (error) {
      console.log(error);
      
    }
  }
  // console.log(user.photoURL);
  const links=<>
       <li><a>Home</a></li>
    
        <li><a>Products</a></li>
  
  </>


  

    return (
      <div className="navbar md:px-10 bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {/* add links li */}
       {links}
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost text-xl">AppStorm</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>


  <div className="navbar-end">
    {/* Become A Host btn */}

                <div className=' '>
                  {/* {!user && ( */}
                    <button
                      // disabled={!user}
                      onClick={()=>setIsModalOpen(true)}
                      className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    >
                      Host your product
                    </button>
                  {/* )} */}
                </div>

                {/* modal */}
                <HostModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={ModalHandler}/>

    {
      user ? <div className="dropdown  dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL} />
        </div>
      </div>
      <div className=''>
      <ul
        tabIndex={0}
        className="menu menu-sm bg-red-400 dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow">
        <p className='text-center text-xl py-1'>
          <a className="justify-between">
            {user?.displayName}
           
          </a>
        </p>
        <li className='my-2 '><Link className='textarea-md py-2' to={'/dashboard'}>Dashboard</Link></li>
        <button className='btn mt-5' onClick={handleLogOut}><a className='textarea-md py-2'>Logout</a></button>
      </ul>
      </div>
    </div> 
    :
    <div className='flex gap-2'>
      <button className="btn"><Link to={'/login'}>Login</Link></button>
      <button className="btn"><Link to={'/register'}>Register</Link></button>
    </div>
    
     

    }
  </div>
</div>
    );
};

export default Navbar;