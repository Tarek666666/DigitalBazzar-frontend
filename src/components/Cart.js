import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";


function Cart({ isDarkMode, loggedUser }) {
    const [items, localCart ,total] = useContext(CartContext);

    console.log(loggedUser , loggedUser.cart , '=====> from cart page')

    return (
        <div
            class={
                isDarkMode
                    ? "dropdown cart-dropdown-container cart-dropdown-container-dark"
                    : "dropdown cart-dropdown-container"
            }
        >
            <button
                class='btn btn-primary '
                className='shopping-cart-btn'
                type='button'
                id='dropdownMenuButton'
                data-mdb-toggle='dropdown'
                aria-expanded='false'
            >
                <RiShoppingCart2Fill className='cart-icons' size={23} />{" "}
                {loggedUser && <span className='cart-text hidden-responsive hidden-responsive-medium hidden-responsive-larg'>{loggedUser.username + " 's"}</span>}
                {!loggedUser && <span className='cart-text hidden-responsive hidden-responsive-medium hidden-responsive-larg'>Cart</span>}
                <span className='badge'>{loggedUser && items.reduce((acc, item) => acc + item.qty, 0)}
                                        {!loggedUser && localCart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
            </button>
            <ul
                class={
                    !isDarkMode
                        ? "dropdown-menu cart-dropdown cart-dropdown-dark"
                        : "dropdown-menu cart-dropdown"
                }
            >
                <div className='total-cart'>
                    TOTAL $ <span>{loggedUser &&  total.toFixed(2)} {!loggedUser && localCart.reduce((acc, item) => acc + (item.itemInDb.price * item.qty), 0).toFixed(2)}</span>
                </div>
                {loggedUser && items.length === 0 && <p>Shopping cart is empty</p>}
                {!loggedUser && localCart.length === 0 && <p>Shopping cart is empty</p>}

                {loggedUser && items.length > 0 && items.map((product) => {
                    return (
                        <li class='dropdown-item' key={product.productId._id}>
                        <div className='item-container-cart'>
                            <img src={product.productId.image} alt={product.productId.image} />
                            <div className='item-info-container'>
                                <span className='item-cart-title'>{product.productId.name}</span>
                                <span className='item-cart-price'>
                                    $ {product.productId.price} x {"("}
                                    {product.qty}
                                    {")"}
                                </span>
                            </div>
                        </div>
                    </li>
                    );
                })}
                 {!loggedUser && localCart.map((product) => {
                    return (
                        <li class='dropdown-item' key={product.itemInDb._id}>
                            <div className='item-container-cart'>
                                <img src={product.itemInDb.image} />
                                <div className='item-info-container'>
                                    <span className='item-cart-title'>{product.itemInDb.name}</span>
                                    <span className='item-cart-price'>
                                        $ {product.itemInDb.price} x {"("}
                                        {product.qty}
                                        {")"}
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
             

                <button className='view-cart-btn'>
                    {" "}
                    <Link
                        className='d-flex justify-content-center align-items-center w-100 h-100'
                        to={"/cart"}
                    >
                        {" "}
                        SHOW CART{" "}
                    </Link>
                </button>
            </ul>
        </div>
    );
}

export default Cart;
