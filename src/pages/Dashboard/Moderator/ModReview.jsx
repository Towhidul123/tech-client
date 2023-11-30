import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '@smastrom/react-rating/style.css'
import { AuthContext } from '../../../Providers/AuthProvider';


const ModReview = () => {


    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const { user, loading } = useContext(AuthContext)

 
    if (loading) {
        return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
    }


    //upvote

   


    useEffect(() => {
        console.log('Fetching data for productId:', productId);
        fetch(`http://localhost:5000/productReview/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
               
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
  
    const { _id, productName, productImage, description, tags, externalLinks, ownerName, ownerImage, ownerEmail, status } = product;
   

    return (
        <>
            <br />
            <br />
            <br />
            <div className='max-w-screen-xl mx-auto md:flex '>
                
                <div className='md:w-96'>
                    <img src={product.productImage} alt="" />
                </div>

                <div className='space-y-2 space-x-2'>
                    <h1 className='ml-2 text-3xl font-semibold'>{product.productName}</h1>
                    <p className='text-xl font-medium'>{product.description}</p>
                  
                  
                 
                </div>

            </div>



            



        </>
    );
};

export default ModReview;