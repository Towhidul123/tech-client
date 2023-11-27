import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Featured from './Featured/Featured';
import Trending from './Trending/Trending';

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div className='max-w-screen-xl mx-auto'>
          
                <Featured></Featured>
                <Trending></Trending>
            </div>


        </div>
    );
};

export default Home;