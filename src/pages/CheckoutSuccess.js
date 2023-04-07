import React, { useEffect, useContext } from "react";
import CartContext from "../context/CartContext";

function CheckoutSuccess() {
    // after user checks out successfully , the cart will be cleared, also on the back end this endpoint handles the request and clear cart in database as well
    const [items] = useContext(CartContext);

    useEffect(() => {
        fetch("https://digital-bazzar-backend.herokuapp.com/user/clearcart" , { 
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
               
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='verf-container mt-4 mb-4'>
            <h3>Your Order is placed , an email was sent to your email !</h3>
            <a href='/products'> SHOP AGAIN</a>
        </div>
    );
}

export default CheckoutSuccess;
