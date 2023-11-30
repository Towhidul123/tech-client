import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ReviewTable = ({ item }) => {
    const { _id, productName, productImage, description, tags, externalLinks, ownerName, ownerImage, ownerEmail, status } = item;
    const { user, loading } = useContext(AuthContext);

 
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleAccept = async (productId) => {
        try {
          
            const response = await fetch(`http://localhost:5000/productReview/accept/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
            
                setIsButtonDisabled(true);
                toast.success("accepted")
           
            } else {
                console.error('Failed to update product status');
            }
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };


    const handleReject = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/productReview/reject/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setIsButtonDisabled(true);
                toast.error("rejected");
              
            } else {
                console.error('Failed to update product status');
            }
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };



    return (
        <div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <tbody>
                        <tr key={_id}>
                            <td>{productName}</td>
                            <td>
                                <Link to={`/productReview/${_id}`}>
                                    <button className='btn btn-primary' >View Details</button>
                                </Link>
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={() => handleAccept(_id)} disabled={isButtonDisabled}>
                                    Accept
                                </button>
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={() => handleReject(_id)} disabled={isButtonDisabled}>
                                    Reject
                                </button> </td>
                        </tr>
                  
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewTable;
