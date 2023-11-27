import React, { useEffect, useState } from 'react';
import TrendingCard from './TrendingCard';
import { Link } from 'react-router-dom';

const Trending = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const sortedItems = data.sort((b, a) => a.upvote_count - b.upvote_count);
                const firstSixItems = sortedItems.slice(0, 6);
                setMenu(firstSixItems);
            })
    }, [])


    return (
        <div className='text-center mt-4'>

            <h3 className="text-3xl font-bold">Trending</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    menu.map(item => <TrendingCard key={item._id} item={item}></TrendingCard>)
                }

            </div>

            <div className='mt-4' >

                <Link to="/productDetails">
                    <button className='btn'>Show All Products</button>
                </Link>
            </div>

        </div>

    );
};

export default Trending;