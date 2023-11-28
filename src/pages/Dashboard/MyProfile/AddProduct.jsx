import React, { useState, useEffect, useContext } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { AuthContext } from '../../../Providers/AuthProvider';
import axios from 'axios';

const AddProduct = () => {

    const { user, loading } = useContext(AuthContext)
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [externalLinks, setExternalLinks] = useState('');



    if (loading) {
        return <span className="flex place-content-center justify-center justify-items-center items-center loading loading-spinner loading-lg"></span>
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newProduct = {
            productName,
            productImage,
            description,
            tags,
            externalLinks,
            ownerName: user.displayName,
            ownerImage: user.photoURL,
            ownerEmail: user.email,
          };
        
          try {
            const response = await fetch('http://localhost:5000/dashboard/userProduct', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newProduct),
            });
        
            if (response.ok) {
              alert('Product saved successfully!');
              window.location.href = '/dashboard/MyProfile';
            } else {
              console.error('Error saving product:', response.statusText);
            }
          } catch (error) {
            console.error('Error saving product:', error);
          }
        };
    
      const handleTagsChange = (newTags) => {
        setTags(newTags);
      };


    return (
        <>
            <h2 className='text-center text-6xl'>Add Products</h2>



            <form className='max-w-md mx-auto' onSubmit={handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <input type="text"  value={productImage}  onChange={(e) => setProductImage(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product URL</label>
                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Description</label>
                </div>

                <div className="grid md:grid-cols-3 md:gap-6">

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={user.displayName} disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={user.photoURL} disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner Image</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={user.email} disabled className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner Email</label>
                    </div>

                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div>
                        <label>Tags</label>
                        <ReactTags tags={tags} handleDelete={handleTagsChange} handleAddition={handleTagsChange} />

                    </div>
                    <div>
                        <label>External Links</label>
                        <input type="text" value={externalLinks} onChange={(e) => setExternalLinks(e.target.value)} className='border-2 rounded'  />

                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>




        </>
    );
};

export default AddProduct;