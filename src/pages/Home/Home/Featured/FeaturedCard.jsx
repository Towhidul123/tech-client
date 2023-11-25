import React from 'react';

const FeaturedCard = ({item}) => {

    const {name, image, tags, upvote_count } = item;

    return (
        <div className="mt-5 card card-compact w-50 bg-base-100 shadow-xl">
            <figure><img src={image} alt="tech" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{tags}</p>
                <div className="btn btn-secondary card-actions justify-center items-center">
                {upvote_count}
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;