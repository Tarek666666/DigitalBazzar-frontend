import React, { useContext, useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedCollection from "../components/FeaturedCollection";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineGift } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { RiVisaFill } from "react-icons/ri";
import MarqueeItems from "../components/Marquee";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import ProductsContext from "../context/ProductsContext";

function Home() {
    const [products] = useContext(ProductsContext);
    const [featuredProds, setFeaturedProds] = useState([]);
    const [theme, isDarkMode] = useContext(ThemeContext);
    const laptops = products.products
        ? products.products.filter((prod) => prod.category.toLowerCase() === "laptop")
        : [];
    const mobiles = products.products
        ? products.products.filter((prod) => prod.category.toLowerCase() === "mobile")
        : [];
    const pcs = products.products
        ? products.products.filter((prod) => prod.category.toLowerCase() === "pc")
        : [];
    const accessoires = products.products
        ? products.products.filter((prod) => prod.category.toLowerCase() === "accessoires")
        : [];

    useEffect(() => {
        setFeaturedProds(
            products.products ? products.products.filter((prod) => prod.featured === true) : []
        );
    }, [products]);
    return (
        <>
            <HeroSection isDarkMode={isDarkMode} />
            <div
                className={
                    !isDarkMode
                        ? "short-cuts-container short-cuts-container-dark hidden-responsive hidden-responsive-medium"
                        : "short-cuts-container hidden-responsive hidden-responsive-medium"
                }
            >
                <div className='container-xxl'>
                    <div className='row py-5 '>
                        <div className='col-12 icons-container d-flex'>
                            <div>
                                <FaShippingFast color='white' size={45} />
                                <h4 className='text-white'>Free Shipping</h4>
                                <p className='text-white'>
                                    All Orders above $100 will be shipped free!
                                </p>
                            </div>
                            <div>
                                <AiOutlineGift color='white' size={45} />
                                <h3 className='text-white'>Dily Gifts</h3>
                                <p className='text-white'>Save up to 25% and more!</p>
                            </div>
                            <div>
                                <BiSupport color='white' size={45} />
                                <h3 className='text-white'>Support</h3>
                                <p className='text-white'>shop with an expert</p>
                            </div>
                            <div>
                                <TbTruckReturn color='white' size={45} />
                                <h3 className='text-white'>Return Free</h3>
                                <p className='text-white'>
                                    within 14 days products can be returned
                                </p>
                            </div>
                            <div>
                                <RiVisaFill color='white' size={45} />
                                <h3 className='text-white text-center'>Secure payments</h3>
                                <p className='text-white'>All visa cards are supported</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={
                    !isDarkMode
                        ? "quick-links-container quick-links-container-dark"
                        : "quick-links-container"
                }
            >
                <div className='products-container'>
                    <div className='single-product-container'>
                        <div className='single-info-container d-flex flex-column align-items-center'>
                            <h5>
                                {" "}
                                <Link to={"/laptops"}>Laptops</Link>{" "}
                            </h5>
                            <p>Items: {laptops.length} </p>
                        </div>
                        <div className='single-photo-container'>
                            <img src='images/quick-links-photos/laptops.png' />
                        </div>
                    </div>
                    <div className='single-product-container'>
                        <div className='single-info-container d-flex flex-column align-items-center'>
                            <h5>
                                {" "}
                                <Link to={"/pcs"}>Pc's</Link>{" "}
                            </h5>
                            <p>Items: {pcs.length} </p>
                        </div>
                        <div className='single-photo-container'>
                            <img src='images/quick-links-photos/pc.png' />
                        </div>
                    </div>
                    <div className='single-product-container'>
                        <div className='single-info-container d-flex flex-column align-items-center'>
                            <h5>
                                {" "}
                                <Link to={"/mobiles"}>Mobiles</Link>{" "}
                            </h5>
                            <p>Items: {mobiles.length} </p>
                        </div>
                        <div className='single-photo-container'>
                            <img src='images/quick-links-photos/mobiles.png' />
                        </div>
                    </div>
                    <div className='single-product-container'>
                        <div className='single-info-container d-flex flex-column align-items-center'>
                            <h5>
                                {" "}
                                <Link to={"/accessoires"}>Accessoires</Link>{" "}
                            </h5>
                            <p>Items: {accessoires.length} </p>
                        </div>
                        <div className='single-photo-container'>
                            <img src='images/quick-links-photos/keyboards.png' />
                        </div>
                    </div>
                </div>
            </div>

            {products.loading && !products.products && <h1>Loadiiiiiiiiiiiiiiiiiiiiing</h1>}
            {!products.loading && products.products && (
                <FeaturedCollection featuredProds={featuredProds} isDarkMode={isDarkMode} />
            )}

            <MarqueeItems />
        </>
    );
}

export default Home;
