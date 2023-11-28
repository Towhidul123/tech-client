import React from 'react';
import { FaUsers } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    const isAdmin = true;

    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen ">
                <ul className='menu'>

                    {
                        isAdmin ? <>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/'>Statistics Page</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUsers></FaUsers> Manage Users</NavLink></li>
                            <li><NavLink to='/dashboard/'>Manage Coupons</NavLink></li>

                        </>
                            :
                            <>
                                <li><NavLink to='/dashboard/MyProfile'>My Profile</NavLink></li>
                                <li><NavLink to='/dashboard/AddProducts'>Add Products</NavLink></li>
                                <li><NavLink to='/dashboard/MyProduct'>My Products</NavLink></li>


                            </>

                    }

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