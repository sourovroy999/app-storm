import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
             {/* side bar */}
            <div>
                <Sidebar/>
            </div>

            {/* Outlet-> dynamic content */}
            <div className="flex-1 md:ml-64">
                <div className="p-5">

            <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;