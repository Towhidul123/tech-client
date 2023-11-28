import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen ">
                <ul className='menu'>
                    <li><NavLink to='/dashboard/MyProfile'>My Profile</NavLink></li>
                    <li><NavLink to='/dashboard/AddProducts'>Add Products</NavLink></li>
                    <li><NavLink to='/dashboard/MyProduct'>My Products</NavLink></li>

                </ul>
            </div>

        {/* Dashboard content */}
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard; 