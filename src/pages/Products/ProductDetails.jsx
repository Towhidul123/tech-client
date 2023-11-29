import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import ReviewComponent from '../Review/ReviewComponent';


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaThumbsUp } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { MdReport } from "react-icons/md";

const ProductDetails = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const { user, loading } = useContext(AuthContext)


    const [reviews, setReviews] = useState([]);

    const [reviewData, setReviewData] = useState({ username: '', rating: '', comment: '' });

    if(loading){
        return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
    }


    //upvote
    
    const handleUpvoteClick = async () => {

        if (loading) {
            return toast.loading("Upvoting...");
        }
    

        if (user) {
            try {
                const response = await fetch(`http://localhost:5000/api/upvote/${_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, 
                    },
                });

                if (response.ok) {
                    toast.success("Upvoted.");
                   
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

    const handleReport = async () => {
        if (loading) {
            return toast.loading("Reporting...");
        }
    
        if (user) {
            try {
                const response = await fetch(`http://localhost:5000/api/report/${_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, 
                    },
                });
    
                if (response.ok) {
                    toast.success("Reported successfully.");
                  
                } else {
                    toast.error("Failed to report.");
                }
            } catch (error) {
                console.error("Error while reporting:", error);
                toast.error("An error occurred while reporting.");
            }
        } else {
            toast.error("Please login to report.");
        }
    };



    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log('Review Data:', reviewData); 
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId: _id,
                username: reviewData.username,
                userImage: reviewData.userImage,
                rating: reviewData.rating,
                comment: reviewData.comment,
                // timestamp: new Date().toISOString(),
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                    setReviewData({ username: user.displayName, userImage: user.photoURL, rating: '', comment: '' });

                }
            });
    };



    useEffect(() => {
        console.log('Fetching data for productId:', productId);
        fetch(`http://localhost:5000/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                fetch(`http://localhost:5000/reviews?roomId=${data._id}`)
                    .then(res => res.json())
                    .then(reviewsData => setReviews(reviewsData));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const { _id, name, image, description, tags, external_links, category, upvote_count } = product;


    return (
        <>
            <br />
            <br />
            <br />
            <div className='max-w-screen-xl mx-auto md:flex '>

                <div className='md:w-96'>
                    <img src={product.image} alt="" />
                </div>

                <div className='space-y-2 space-x-2'>
                    <h1 className='ml-2 text-3xl font-semibold'>{product.name}</h1>
                    <p className='text-xl font-medium'>{product.description}</p>
                    <h2 className='text-xl'>Tags: {product. tags.map((tag, index) => (
                                <span key={index} className="badge bg-primary text-white mr-2 mb-2">
                                    {tag}
                                </span>
                            ))}</h2>
                    <h2 className='text-xl'>External Links: {Object.keys(product.external_links).map(linkType => (
                        <a key={linkType} href={product.external_links[linkType]}>{linkType}</a>
                    ))}</h2>
                    <h2 className='text-xl'>Upvote Count: {product.upvote_count}</h2>

                    <div className='space-x-2'>
                        <button className='btn btn-primary'>  <span onClick={handleUpvoteClick}>
                            
                            <FaThumbsUp />
                        </span>Upvote</button>
                        <button className='btn btn-secondary'><span onClick={handleReport}><MdReport /> </span>Report</button>
                    </div>
                </div>

            </div>


            <div className='p-10'>
                <h3 className='text-center text-3xl'>Reviews</h3>
                <div className=' flex justify-center items-center'>

                    <Swiper slidesPerView={2}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper">

                        {reviews.map((review) => (
                            <SwiperSlide key={review._id}>
                                <ReviewComponent
                                    username={review.username}
                                    rating={review.rating}
                                    comment={review.comment}
                                    userImage={review.userImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>


            <div className='p-10 flex justify-center items-center flex-col'>

                <h3 className='text-3xl mb-2'>Submit a Review</h3>

                <form onSubmit={handleReviewSubmit} className=" flex flex-col items-center ">

                    <img className='w-10' src={user.photoURL} alt="" />
                    <p>Username: {user.displayName}</p>

                    <input
                        type="number"
                        placeholder="Rating"
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Comment"
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        required
                    />
                    <button className='btn' type="submit">Submit Review</button>
                </form>
            </div>


        </>
    );
};

export default ProductDetails;