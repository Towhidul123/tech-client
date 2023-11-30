import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



const Products = () => {


    const [menu, setMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => setMenu(data))
    // }, [])

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/products?search=${searchTerm}&page=${currentPage}`);
        const data = await response.json();
        setMenu(data);
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm, currentPage]);

    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        setCurrentPage(1); // Reset to the first page when performing a new search
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (

        <div className='text-center '>
            <br />
            <br />
            <br />
            <h3 className="text-3xl font-bold">Products</h3>
            <input type="text" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} placeholder="Search products" />

            <Swiper
                modules={[Pagination]}
                className="mySwiper"
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div data-aos="fade-up" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {menu.map(item => (
                            <ProductsCard key={item._id} item={item}></ProductsCard>
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Pagination */}
            <div className="space-x-2">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>


        </div>




    );
};

export default Products;