import React, { useEffect, useState } from 'react';
import FeaturedCard from './FeaturedCard';

const Featured = () => {

    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const featuredItems = data.filter(item => item.category === 'featured')
                setMenu(featuredItems);
            })
    }, [])


    return (

        <div className='text-center mt-4'>

            <h3 className="text-3xl font-bold">Featured</h3>

            <div data-aos="fade-up" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    menu.map(item => <FeaturedCard key={item._id} item={item}></FeaturedCard>)
                }

            </div>



        </div>




    );
};

export default Featured;