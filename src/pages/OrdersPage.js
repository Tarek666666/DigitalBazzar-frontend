import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ordersPage.css";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    async function fetchOrders() {
        setLoading(true);

        fetch("https://digital-bazzar-backend.herokuapp.com/admin/dashboard/orders", {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
            .then((res) => {
         
                return res.json();
            })
            .then((data) => {

                setLoading(false);
                setError(false);
                console.log('data' , data)
                 /**   if(data.ordersInDb){
                        setOrders(fetchOrders.data.ordersInDb);
                    }else{
                     
                    } */
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                setErrorMessage(error);
            });
       
    }

    useEffect(() => {
      
        fetchOrders();
    }, []);

    return (
        <div className='order-table-container'>
            <table className='order-table'>
                <thead className='table-header'>
                    {loading && (
                        <tr>
                            <th>LOADING ....</th>
                        </tr>
                    )}
                    {!error && !loading && (
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Shipping Status</th>
                        </tr>
                    )}
                </thead>
                {!error && !loading && (
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.userId.username}</td>
                                <td>{order.userId.email}</td>
                                <td>
                                    {order.order.items.map((item) => (
                                        <div key={item.productId._id}>
                                            {item.productId.name} ( x{item.qty}) - $
                                            {item.productId.price}
                                        </div>
                                    ))}
                                </td>
                                <td>${order.order.total.toFixed(2)}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.shipped ? "Shipped" : "Not Shipped"}</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default OrdersPage;
