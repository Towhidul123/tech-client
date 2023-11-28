import React from 'react';

const ReviewComponent = ({ username, rating, comment, userImage }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-4 flex">
            <div className='text-center'>
                <div className="avatar">
                    <div className="w-20 rounded-full">
                        <img className='rounded-full w-24' src={userImage} alt="" />
                    </div>
                </div>

                <h4 className="text-xl font-bold mb-2"> {username}</h4>
            </div>


            <div>

                <p>Rating: {rating}</p>
                <p>Comment: {comment}</p>
            </div>

        </div>

        
    );
};

export default ReviewComponent;
