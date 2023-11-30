import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from "../AllUsers/UseAxiosSecure";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminStats = () => {
    const axiosSecure = UseAxiosSecure();
    const [menuData, setMenuData] = useState([]);
    const [productReviewData, setProductReviewData] = useState([]);
    const [userData, setUserData] = useState([]);
    
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(response => response.json())
            .then(data => setMenuData(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/productReview')
            .then(response => response.json())
            .then(data => setProductReviewData(data));
    }, []);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const pieChartData = [
        { name: 'Menu Items', value: menuData.length },
        { name: 'Product Reviews', value: productReviewData.length },
        { name: 'Users', value: users.length },
    ];

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

    return (
        <div>
            <h2 className="text-center font-bold text-6xl">Statistics</h2>
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <h2>Menu Data:</h2>
                    <ul>
                        {menuData.map(item => (
                            <li key={item._id}></li>
                        ))}
                        <li>Total Menu Items: {menuData.length}</li>
                    </ul>
                </div>

                <div>
                    <h2>Product Review Data:</h2>
                    <ul>
                        {productReviewData.map(item => (
                            <li key={item._id}></li>
                        ))}
                        <li>Total Product Reviews: {productReviewData.length}</li>
                    </ul>
                </div>

                <div>
                    <h2>User Data:</h2>
                    <ul>
                        {users.map(item => (
                            <li key={item._id}>{item.username}</li>
                        ))}
                        <li>Total Users: {users.length}</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminStats;
