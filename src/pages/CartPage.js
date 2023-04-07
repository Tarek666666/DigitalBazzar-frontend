import React from "react";
import "../css/cart.css";
import CartContext from "../context/CartContext";
import ThemeContext from "../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../css/AppDark.css";

function CartPage({ loggedUser }) {
    const [theme, isDarkMode] = useContext(ThemeContext);
    const [alertMessage, setAlertMessage] = useState("");
    const [items, localCart, total, addToCart, deleteFromCart, decreaseFromCart, increaseFromCart] = useContext(CartContext);
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(total);
    const localFormattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(localCart.reduce((acc, item) => acc + item.itemInDb.price * item.qty, 0));

    async function handleCheckout() {
        
        // handle checkout only if shopping carts has at least one item
        if (items.length > 0) {
            fetch("https://digital-bazzar-backend.herokuapp.com/create-checkout-session", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items, total, userId: loggedUser._id }),
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    // case product was succesfully added
                    if (data.url) {
                       // redirect to stripe url
                        window.location.href = data.url;
                    } else {
                        console.log('something went wrong',data);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setAlertMessage("ADD ITEMS TO CART FIRST");
        }
    }

    async function handleUnloggedUser() {
        setAlertMessage("You Need To Login before checkout");
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage("");
        }, 2500);
    }, [alertMessage]);
    return (
        <div
            className={
                !isDarkMode
                    ? "cart-page-container cart-page-container-dark  mt-2 mb-2 "
                    : "cart-page-container mt-2 mb-2  "
            }
        >
            <div className='cart-header d-flex justify-content-center'>
                {alertMessage.length === 0 && (
                    <h3>
                        {" "}
                        Total: {loggedUser && formattedPrice} {!loggedUser && localFormattedPrice}{" "}
                    </h3>
                )}

                {alertMessage.length > 0 && <h3 className='cart-alert'> {alertMessage}</h3>}
            </div>
            <div className='items-in-cart-container'>
                {loggedUser && items.length === 0 && (
                    <div className='cart-empty-container'>
                        {" "}
                        <h4>Shopping Cart is Empty</h4>{" "}
                        <Link className='back-link' to={"/"}>
                            Go Back Home!
                        </Link>{" "}
                    </div>
                )}
                {!loggedUser && localCart.length === 0 && (
                    <div className='cart-empty-container'>
                        {" "}
                        <h4>Shopping Cart is Empty</h4>{" "}
                        <Link className='back-link' to={"/"}>
                            Go Back Home!
                        </Link>{" "}
                    </div>
                )}
                {loggedUser &&
                    items.map((item) => {
                        return (
                            <div key={item._id} className='item-container-cartpage mb-2 mt-2'>
                                <img src={item.productId.image} />
                                <div className='item-info-container-cartpage'>
                                    <span className='item-cart-title-cartpage fw-bold'>
                                        {item.productId.name}
                                    </span>
                                    <span className='item-cart-price-cartpage fw-bolder'>
                                        $ {item.productId.price} x {"("}
                                        {item.qty}
                                        {")"}
                                    </span>
                                </div>
                                <div className='buttons-container-cartpage'>
                                    <button
                                        onClick={() =>
                                            increaseFromCart(
                                                item.productId._id,
                                                item.productId.price
                                            )
                                        }
                                    >
                                        <AiFillPlusCircle className='btn-icon-plus' size={25} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteFromCart(item.productId._id, item.productId.price)
                                        }
                                    >
                                        <AiFillDelete className='btn-icon-delete' size={25} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            decreaseFromCart(
                                                item.productId._id,
                                                item.productId.price
                                            )
                                        }
                                    >
                                        <AiFillMinusCircle className='btn-icon-minus' size={25} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                {!loggedUser &&
                    localCart.map((item) => {
                        return (
                            <div key={item._id} className='item-container-cartpage mb-2 mt-2'>
                                <img src={item.itemInDb.image} />
                                <div className='item-info-container-cartpage'>
                                    <span className='item-cart-title-cartpage fw-bold'>
                                        {item.itemInDb.name}
                                    </span>
                                    <span className='item-cart-price-cartpage fw-bolder'>
                                        $ {item.itemInDb.price} x {"("}
                                        {item.qty}
                                        {")"}
                                    </span>
                                </div>
                                <div className='buttons-container-cartpage'>
                                    <button
                                        onClick={() =>
                                            increaseFromCart(item.itemInDb._id, item.itemInDb.price)
                                        }
                                    >
                                        <AiFillPlusCircle className='btn-icon-plus' size={25} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteFromCart(item.itemInDb._id, item.itemInDb.price)
                                        }
                                    >
                                        <AiFillDelete className='btn-icon-delete' size={25} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            decreaseFromCart(item.itemInDb._id, item.itemInDb.price)
                                        }
                                    >
                                        <AiFillMinusCircle className='btn-icon-minus' size={25} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {loggedUser && (
                <div className='checkout-btn-container d-flex justify-content-center py-3'>
                    <button className='checkout-btn' onClick={handleCheckout}>
                        CHECKOUT
                    </button>
                </div>
            )}
            {!loggedUser && localCart.length > 0 && (
                <div className='checkout-btn-container d-flex justify-content-center py-3'>
                    <button className='checkout-btn' onClick={handleUnloggedUser}>
                        CHECKOUT
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
