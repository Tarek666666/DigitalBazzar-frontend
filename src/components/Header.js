import React from "react";
import { AiFillPhone, AiFillHome } from "react-icons/ai";
import { FaShippingFast, FaSearch } from "react-icons/fa";
import logo from "../logo.png";
import { HiOutlineMenu } from "react-icons/hi";
import SwitchTheme from "./SwitchTheme";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import "../css/AppDark.css";


function Header({ theme, loggedUser }) {
    const [searchKey, setSearchKey] = useState("a");
    const isDarkMode = theme === "dark";

    function handleSearchKeyChange(e) {
        setSearchKey(e.target.value);
    }

    return (
        <>
            <header className={isDarkMode ? "dark" : "header-topest"}>
                <div
                    className={
                        isDarkMode
                            ? "container-xxl  header-topest-container dark"
                            : "container-xxl header-topest-container "
                    }
                >
                    <div
                        className={
                            isDarkMode ? "dark row top-nav-container-dark" : "row top-nav-container"
                        }
                    >
                        <div
                            className={
                                isDarkMode
                                    ? "dark col-4 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                                    : "col-4 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                            }
                        >
                            <p className='text-white  hidden-responsive '>
                                <FaShippingFast size={18} /> Free Shipping over $100 & free returns
                            </p>
                        </div>
                        <div
                            className={
                                isDarkMode
                                    ? "dark col-1 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                                    : "col-1 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                            }
                        ></div>
                        <div
                            className={
                                isDarkMode
                                    ? "dark col-2 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                                    : "col-2 hidden-responsive hidden-responsive-medium hidden-responsive-larg"
                            }
                        >
                            <p className='text-white '>
                                <AiFillPhone size={20} />:{" "}
                                <a className='ms-2 text-white text-decoration-none hidden-responsive' href='tel:+31682565642'>
                                    +31682565642
                                </a>
                            </p>
                        </div>
                     { !loggedUser &&  <div className={isDarkMode ? "dark col-2  " : "col-2  "}>
                            <p >
                                <a  className='text-white text-decoration-none'href='/signup'>New Account</a>
                            </p>
                        </div>}
                      { loggedUser &&  <div className={isDarkMode ? "dark col-2  " : "col-2  "}>
                            <p >
                                <a  className='text-white text-decoration-none'href='/products'>SHOP</a>
                            </p>
                        </div>}

                        <div
                            className={
                                isDarkMode
                                    ? "dark col-1 hidden visible-responsive hidden-responsive-larg"
                                    : "col-1 visible-responsive hidden hidden-responsive-larg"
                            }
                        >
                            <p className='text-white '>
                                <Link className="home-icon" to={"/"}>
                                    <AiFillHome size={20} />
                                </Link>
                            </p>
                        </div>

                        <div className={isDarkMode ? "dark col-1  " : "col-1"}>
                            <p className='text-white  '>
                                {loggedUser && <Link to='signin ' className="text-white text-decoration-none" >Logout</Link>}
                                {!loggedUser && <Link to='signin' className="text-white text-decoration-none" >Login</Link>}
                            </p>
                        </div>
                        <SwitchTheme className='hidden-responsive hidden-responsive-medium' />
                    </div>
                </div>
            </header>
            <header
                className={isDarkMode ? "seconed-header-dark dark seconed-header" : "seconed-header"}
            >
                <div className='container-xxl'>
                    <div className='row second-nav-container'>
                        <div className='col-2 logo-container'>
                            <img className='logo' src={logo} alt='logo' />
                            <span className='logo-text'>DigitaL Bazaar </span>
                            <span className='logo-extra-text'>Buy , Sell , Repair </span>
                        </div>
                        <div className='col-10 search-container'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    aria-label='Text input with dropdown button'
                                    placeholder='Products'
                                    onChange={handleSearchKeyChange}
                                />
                                <Link
                                    to={`search/${searchKey}`}
                                    type='submit'
                                    class='btn btn-primary search-btn'
                                >
                                    {" "}
                                    <FaSearch className='search-btn-icon' size={21} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className={isDarkMode ? "menu-header-dark " : "menu-header"}>
                <div className='container-xxl'>
                    <div className='row menu-header-container'>
                        <div className='col-8 menu-buttons-container'>
                            <div class='dropdown catagories-dropdown hidden-responsive hidden-responsive-medium hidden-responsive-larg'>
                                <button
                                    class='btn btn-primary '
                                    type='button'
                                    id='dropdownMenuButton'
                                    data-mdb-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <HiOutlineMenu className='search-btn-icon ' size={21} /> All
                                    CATEGORIES
                                </button>
                                <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                    <li className='list-item'>
                                        <Link className='dropdown-item' to={"/laptops"}>
                                            Laptops
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' to={"/pcs"}>
                                            Pc's
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' to={"/mobiles"}>
                                            Mobiles
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' to={"/Accessoires"}>
                                            Accessoires
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div class='dropdown hidden-responsive hidden-responsive-medium'>
                                <button
                                    class='btn btn-primary '
                                    type='button'
                                    id='dropdownMenuButton'
                                    data-mdb-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <Link className="text-decoration-none text-white" to={"/"}> HOME </Link>
                                </button>
                            </div>
                            <div class='dropdown'>
                                <button
                                    class='btn btn-primary '
                                    type='button'
                                    id='dropdownMenuButton'
                                    data-mdb-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <Link className="text-decoration-none text-white"  to={"products"}> OUR STORE </Link>
                                </button>
                            </div>
                            <div class='dropdown shop-by-brand hidden-responsive '>
                                <button
                                    class='btn btn-primary '
                                    type='button'
                                    id='dropdownMenuButton'
                                    data-mdb-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    SHOP BY BRAND
                                </button>
                                <ul
                                    class='dropdown-menu brands-buttons '
                                    aria-labelledby='dropdownMenuButton'
                                >
                                    <button className='samsung-btn'>
                                        {" "}
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/samsung"}
                                        ></Link>{" "}
                                    </button>
                                    <button className='lg-btn'>
                                        {" "}
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/lg"}
                                        ></Link>{" "}
                                    </button>
                                    <button className='sony-btn'>
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/sony"}
                                        ></Link>{" "}
                                    </button>
                                    <button className='asus-btn'>
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/asus"}
                                        ></Link>{" "}
                                    </button>
                                    <button className='huw-btn'>
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/huwawei"}
                                        ></Link>{" "}
                                    </button>
                                    <button className='hp-btn'>
                                        <Link
                                            className='h-100 w-100 d-inline-block'
                                            to={"/search/hp"}
                                        ></Link>{" "}
                                    </button>
                                </ul>
                            </div>
                            {loggedUser && loggedUser.role === "admin" && (
                                <div class='dropdown '>
                                    <button
                                        class='btn btn-primary '
                                        type='button'
                                        id='dropdownMenuButton'
                                        data-mdb-toggle='dropdown'
                                    >
                                        <Link
                                            className='text-decoration-none text-white'
                                            to={"/dashboard"}
                                        >
                                            {" "}
                                            ADMIN'S DASHBOARD
                                        </Link>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='col-2 cart-btn-container'>
                            <Cart isDarkMode={isDarkMode} loggedUser={loggedUser} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;
