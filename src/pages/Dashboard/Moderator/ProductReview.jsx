import React, { useEffect, useState } from 'react';
import ReviewTable from './ReviewTable';

const ProductReview = () => {


    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/productReview')
            .then(res => res.json())
            .then(data => {
              
                setMenu(data);
            })
    }, [])


    return (

        <div className='text-center mt-4'>

            <h3 className="text-3xl font-bold">Product Review</h3>

            
                {
                    menu.map(item => <ReviewTable key={item._id} item={item}></ReviewTable>)
                }

           



        </div>




    );
};

export default ProductReview;