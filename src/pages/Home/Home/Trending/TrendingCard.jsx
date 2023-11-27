import React, { useContext } from 'react';
import { FaThumbsUp } from "react-icons/fa6";
import { AuthContext } from '../../../../Providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const TrendingCard = ({item}) => {

    const { _id, name, image, tags, upvote_count } = item;
    const { user } = useContext(AuthContext);

    const handleUpvoteClick = () => {

        if (user) {

            toast.success("Upvoted.");
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
        <Link to={`/products/${_id}`}>
            <div className="mt-5 card card-compact w-50 bg-base-100 shadow-xl">
                <figure><img src={image} alt="tech" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{tags}</p>
                    <div className="btn btn-secondary card-actions justify-center items-center">
                        <span onClick={handleUpvoteClick}>
                            {upvote_count}
                            <FaThumbsUp />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    </>
    );
};

export default TrendingCard;