import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';


export default function MyOrder() {
    const [allOrdersData, setAllOrdersData] = useState([]);

    const fetchAllOrdersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/allOrders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const data = await response.json();
            setAllOrdersData(data);
        } catch (error) {
            console.error('Error fetching all orders data:', error);
        }
    };

    useEffect(() => {
        fetchAllOrdersData();
    }, []);

    const sortOrdersByDate = (orders) => {
        return orders.sort((a, b) => new Date(b[0].Order_date) - new Date(a[0].Order_date));
    };

    return (
        <div>
            <AdminNavbar/>
            <div className='container py-5'>
                {allOrdersData.map((userData, index) => (
                    <div key={userData._id} className='my-5'>
                        <h2>{userData.email}</h2>
                        <div className='row row-cols-1 row-cols-md-2 g-4'>
                            {sortOrdersByDate(userData.order_data).map((order, orderIndex) => (
                                <div key={orderIndex} className='col'>
                                    <div className='card shadow'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{order[1].name}</h5>
                                            <ul className='list-group list-group-flush'>
                                                <li className='list-group-item'>Quantity: {order[1].qty}</li>
                                                <li className='list-group-item'>Size: {order[1].size}</li>
                                                <li className='list-group-item'>Order Date: {order[0].Order_date}</li>
                                                <li className='list-group-item'>Price: ₹{order[1].price}/-</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
