import React, { useContext } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../pages/Dashboard/MyProfile/useAdmin';
import useModerator from '../pages/Dashboard/Moderator/useModerator';
import { FaHome, FaProductHunt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { HiTemplate } from "react-icons/hi";
import { GoCodeReview } from "react-icons/go";
import { MdReport } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { BiSolidCoupon } from "react-icons/bi";
import { AuthContext } from '../Providers/AuthProvider';



const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () =>
    logOut()
      .then(() => console.log("User logged out"))
      .catch(error => console.log(error))

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* dashboard sidebar */}
            <div className="w-full min-h-screen lg:w-1/4 xl:w-1/5 bg-gray-800 text-white">

                <ul className='menu'>
                    <li><NavLink to='/' className=" py-2 px-4"><FaHome />Home</NavLink></li>

                    {isAdmin && (
                        <>
                            <li><NavLink to='/dashboard/Statistics' className=" py-2 px-4"><FcStatistics />Statistics Page</NavLink></li>
                            <li><NavLink to='/dashboard/users' className=" py-2 px-4"><FaUsers className="inline" /> Manage Users</NavLink></li>
                            <li><NavLink to='/dashboard/Coupon' className=" py-2 px-4"><BiSolidCoupon />Manage Coupons</NavLink></li>
                        </>
                    )}

                    {isModerator && (
                        <>
                            <li><NavLink to='/dashboard/ProductReview' className=" py-2 px-4"><GoCodeReview />Product Review</NavLink></li>
                            <li><NavLink to='/dashboard/ReportedContent' className=" py-2 px-4"><MdReport /> Reported Content</NavLink></li>
                        </>
                    )}

                    {!isAdmin && !isModerator && (
                        <>
                            <li><NavLink to='/dashboard/MyProfile' className=" py-2 px-4"><FaUserAlt />My Profile</NavLink></li>
                            <li><NavLink to='/dashboard/AddProducts' className=" py-2 px-4"><HiTemplate />Add Products</NavLink></li>
                            <li><NavLink to='/dashboard/MyProduct' className=" py-2 px-4"><FaProductHunt />My Products</NavLink></li>
                        </>
                    )}

                    <li><button className=" px-4 py-2 rounded-lg" onClick={handleLogOut}><FaSignOutAlt />Sign Out</button></li>
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
