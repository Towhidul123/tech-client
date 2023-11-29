import React from 'react';
import { FaUsers } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../pages/Dashboard/MyProfile/useAdmin';
import useModerator from '../pages/Dashboard/Moderator/useModerator';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen ">
                <ul className='menu'>

                    {
                        isAdmin ? <>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/Statistics'>Statistics Page</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUsers></FaUsers> Manage Users</NavLink></li>
                            <li><NavLink to='/dashboard/Coupon'>Manage Coupons</NavLink></li>

                        </>
                            :
                        isModerator ? <>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/dashboard/ProductReview'>Product Review</NavLink></li>
                            <li><NavLink to='/dashboard/ReportedContent'><FaUsers></FaUsers> Reported Content</NavLink></li>
                           
                        </>
                            :
                            <>  <li><NavLink to='/'>Home</NavLink></li>
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