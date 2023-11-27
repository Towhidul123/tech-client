import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const ProductDetails = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log('Fetching data for productId:', productId);
        fetch(`http://localhost:5000/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
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

                <div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h2>Tags: {product.tags.map(tag => <span key={tag}>{tag}</span>)}</h2>
                    <h2>External Links: {Object.keys(product.external_links).map(linkType => (
                        <a key={linkType} href={product.external_links[linkType]}>{linkType}</a>
                    ))}</h2>
                    <h2>Upvote Count: {product.upvote_count}</h2>
               
                        <div className=''>
                            <button className='btn'>Upvote</button>
                            <button className='btn'>Report</button>
                        </div>
                </div>

            </div>
        </>
    );
};

export default ProductDetails;