import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react"



const MyProfile = () => {

    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
    }




    return (
        <div className='container mx-auto'>
            <h2 className='text-6xl text-center'>My profile</h2>

            {/* <div className=' mt-4 flex container m-auto'>
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

            </div> */}

            <div>
                <Card className="w-96">
                    <CardHeader floated={false} className="h-80">
                    <img src={user.photoURL} alt="" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                        <h2>{user.displayName}</h2>
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                        <h2>{user.email}</h2>
                        </Typography>

                        <button className='btn btn-secondary'>Subscribe now <br /> $9.99</button>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                        <h2>Membership status:</h2>
                        </Typography>

                    </CardBody>
                    
                </Card>
            </div>


        </div>

    );
};

export default MyProfile;