import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router'; // Fixed import
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);


  const handleLogOut = async () => {
        setIsLoggingOut(true);

    try {
      await logOut();
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out.');
    }finally {
      setIsLoggingOut(false);
    }
  };


  const links = (
    <>
      <li>
        <Link
          className="relative hover:text-cyan-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-cyan-300 after:transition-all after:duration-200 hover:after:w-full"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="relative hover:text-cyan-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-cyan-300 after:transition-all after:duration-200 hover:after:w-full"
          to="/products"
        >
          Products
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar px-6 md:px-10 py-4 bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 text-white   border-b border-purple-500/30">
      {/* Start */}
      <div className="navbar-start flex items-center gap-4">
        <div className="dropdown">
          <div
            tabIndex={0}
            className="btn btn-ghost lg:hidden p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h12m-4 6h8"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl rounded-xl border border-white/20 bg-gradient-to-b from-slate-800 to-slate-900 w-52"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 to-purple-300 bg-clip-text text-transparent hover:from-cyan-300 hover:to-pink-300 transition-all duration-300"
        >
          AppStorm
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 font-medium">{links}</ul>
      </div>

      {/* End */}
      <div className="navbar-end flex items-center gap-4">

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-cyan-400 transition-all duration-200"
            >
              <div className="w-10 rounded-full overflow-hidden ring-2 ring-purple-400/50">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt={user?.displayName || 'User'}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl rounded-xl border border-white/20 bg-slate-900 text-white w-60"
            >
              <div className="text-center mb-3 pb-3 border-b border-gray-700">
                <p className="font-bold text-lg text-white">{user?.displayName}</p>
                <p className="text-sm text-gray-400 truncate px-2">{user?.email}</p>
              </div>
              <li className="mb-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 hover:bg-cyan-600 hover:text-white rounded-lg px-3 py-2 transition-all duration-200"
                >
                  <span className="text-cyan-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  Dashboard
                </Link>
              </li>
               <li>
                <button
                  onClick={handleLogOut}
                  disabled={isLoggingOut}
                  className={`w-full mt-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-lg py-2 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                    isLoggingOut ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                  aria-busy={isLoggingOut}
                  aria-label="Logout"
                >
                  {isLoggingOut ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Logging out...
                    </>
                  ) : (
                    'Logout'
                  )}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-4 transition-all duration-200 hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-full px-5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Register
            </Link>
          </div>
        )}
      </div>

     
    </nav>
  );
};

export default Navbar;