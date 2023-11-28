import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyProduct = () => {

    const [card, setCard] = useState([]);
    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/dashboard/userProduct/${id}`, {
                    method: 'DELETE'
                })
                .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your product has been deleted.', 'success').then(() => {
                              
                                window.location.reload();
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting product:', error);
                     
                    });

            }
          });
    }


    useEffect(() => {
        fetch('http://localhost:5000/dashboard/userProduct')
            .then(res => res.json())
            .then(data => setCard(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div>
            <h2 className='text-6xl text-center'>My Products</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                    #
                            </th>
                            <th>Name</th>
                            <th>No. of votes</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            card.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.productImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.productName}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.productVote}
                                </td>
                                    {item.status}
                                <th>
                                    <button onClick={() =>handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrashAlt className='text-red-600'></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }




                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyProduct;