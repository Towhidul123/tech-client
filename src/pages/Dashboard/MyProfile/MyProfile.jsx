import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyProfile = () => {

    const { user, loading } = useContext(AuthContext)

    if(loading){
        return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
    }


  

    return (
        <div>
            <h2 className='text-6xl text-center'>My profile</h2>
           
            <div className=' mt-4 flex container m-auto'>
                <div className='avatar'>
                    <div className=' last:w-24 rounded'>
                        <img src={user.photoURL} alt="" />
                    </div>
                </div>
                <div>
                    <h2>Name: {user.displayName}</h2>
                    <h2>Email: {user.email}</h2>
                    <button className='btn btn-secondary'>Subscribe now <br /> $9.99</button>
                    <h2>Membership status:</h2>
                </div>

            </div>

        </div>
    );
};

export default MyProfile;