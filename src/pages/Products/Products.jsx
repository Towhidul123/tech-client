import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



const Products = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [])


    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };



    return (

        <div className='text-center '>
            <br />
            <br />
            <br />
            <h3 className="text-3xl font-bold">Products</h3>

            <div>


                <Swiper
                    pagination={pagination}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {
                                menu.map(item => <ProductsCard key={item._id} item={item}></ProductsCard>)
                            }

                        </div>

                    </SwiperSlide>

                </Swiper>




            </div>



        </div>




    );
};

export default Products;