import React, { useContext , useState , useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import ThemeContext from "../context/ThemeContext";

function ProductCard({ product }) {
    const [items, localCart, total, addToCart] = useContext(CartContext);
    const [theme, isDarkMode] = useContext(ThemeContext);
    const [alert , setAlert] = useState(false);
    const [message , setMessage] = useState('');

    const  changeAddToCartBtn = () => {
        setAlert(true)
        setMessage('Product Added')
    }



    useEffect(()=>{

        setTimeout(() => {

            setAlert(false)
            setMessage('')
            
        }, 1000);

    },[message])

    return (
        <div className='one-product-container d-flex flex-column justify-content-start align-items-center '>
            <img src={product.image} />
            <span className='text-danger fw-bold'>{product.brand}</span>
            <p className={!isDarkMode ? "mb-1 fw-bolder text-black" : "mb-1 fw-bolder"}>
                {product.name}
            </p>
            <ReactStars
                count={5}
                size={24}
                isHalf={true}
                emptyIcon={<i className='far fa-star'></i>}
                halfIcon={<i className='fa fa-star-half-alt'></i>}
                fullIcon={<i className='fa fa-star'></i>}
                activeColor='#ffd700'
                edit={false}
                value={product.rating}
            />
            <p className={!isDarkMode ? "mb-1 fw-bolder text-black" : "mb-1 fw-bolder"}>
                $ {product.price}
            </p>

           { !alert && message.length === 0 && <button
                onClick={() => {
                    addToCart(product);
                    changeAddToCartBtn();
                  }}
                value={product._id}
                className={!isDarkMode ? "add-cart-btn add-cart-btn-dark " : "add-cart-btn"}
            >
                {" "}
                ADD TO CART{" "}
            </button>}
            { alert && message.length > 0 && <button
            
                className={"alert-added"}
            >
                {" "}
                {message}{" "}
            </button>}

            <Link
                className={
                    !isDarkMode ? "view-details-btn view-details-btn-dark" : "view-details-btn"
                }
                to={`/productdetails/${product._id}`}
            >
                View details
            </Link>
        </div>
    );
}

export default ProductCard;
