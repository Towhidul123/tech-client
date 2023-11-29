import React, { useContext } from 'react';
import { FaThumbsUp } from "react-icons/fa6";
import { AuthContext } from '../../../../Providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const TrendingCard = ({ item }) => {

    const { _id, name, image, tags, upvote_count } = item;
    const { user ,loading } = useContext(AuthContext);

    const handleUpvoteClick = async () => {

        if (loading) {
            return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
        }


        if (user) {
            try {
                const response = await fetch(`http://localhost:5000/api/upvote/${_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Include the user's token
                    },
                });

                if (response.ok) {
                    toast.success("Upvoted.");
                    // You might want to update the UI with the updated upvote_count
                    // You can use a state management library like Redux for this purpose
                } else {
                    toast.error("Failed to upvote.");
                }
            } catch (error) {
                console.error("Error while upvoting:", error);
                toast.error("An error occurred while upvoting.");
            }
        } else {
            toast.error("Please login to upvote.");
        }
    };


    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="mt-5 card card-compact w-50 bg-base-100 shadow-xl">

                <div className="card-body">
                    <Link to={`/products/${_id}`}>
                        <figure>
                            <img src={image} alt="tech" />
                        </figure>
                        <h2 className="card-title">{name}</h2>
                    </Link>
                    <div className="tags">
                        {tags && tags.length > 0 && (
                            tags.map((tag, index) => (
                                <span key={index} className="badge bg-primary text-white mr-2 mb-2">
                                    {tag}
                                </span>
                            ))
                        )}
                    </div>
                    <div className="btn btn-secondary card-actions justify-center items-center">
                        <span onClick={handleUpvoteClick}>
                            {upvote_count}
                            <FaThumbsUp />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrendingCard;