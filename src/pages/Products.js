import React from "react";
import ProductCard from "../components/ProductCard";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ProductsContext from "../context/ProductsContext";

function Products() {
    const [products] = useContext(ProductsContext);
    const [theme, isDarkMode] = useContext(ThemeContext);
    const [filtersQueries, setFiltersQueries] = useState("");
    const [prods, setProds] = useState(products.products ? products.products : []);
    const [filterdProds, setFilterdProds] = useState([]);
    const [sortedProducts, setSortedProducts] = useState("-----");
    //---- pagination controllers
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const totalPages = Math.ceil(prods.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = prods.slice(indexOfFirstProduct, indexOfLastProduct);
    const [activePage, setActivePage] = useState(currentPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActivePage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleNextClick = () => {
        if (activePage < pageNumbers.length) {
            setActivePage(activePage + 1);
            setCurrentPage(activePage + 1);
        }
    };

    const handlePrevClick = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
            setCurrentPage(activePage - 1);
        }
    };

    function handleFilterBrand(e) {
        if (e.target.checked) {
            setFiltersQueries(e.target.name);
            setFilterdProds((prev) => [
                ...prev,
                ...prods.filter((prod) => prod.brand.toLowerCase() === e.target.name),
            ]);
        } else {
            setFilterdProds((prev) =>
                prev.filter((prod) => prod.brand.toLowerCase() !== e.target.name)
            );
        }
    }

    function handleSortChange(e) {
        setSortedProducts(e.target.value);

        if (e.target.value === "lowest-price") {
            setProds(prods.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
            setFilterdProds(filterdProds.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
        } else if (e.target.value === "highest-price") {
            setProds(prods.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
            setFilterdProds(filterdProds.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
        } else if (e.target.value === "default") {
            setProds(prods.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)));
            setFilterdProds(filterdProds.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)));
        }
    }

    useEffect(() => {
        setProds(products.products ? products.products : []);
    }, [products]);

    return (
        <>
            <h3 className='store-title  m-auto text-center py-3 fw-bold'>OUR STORE</h3>
            <div className={!isDarkMode ? "container-xxl container-xxl-dark" : "container-xxl"}>
                <div className='row prod-opt-container mb-5'>
                    <div className='col-2 opt-container'>
                        
                        <div>
                            <input
                                type='checkbox'
                                id='samsung'
                                name='samsung'
                                onChange={handleFilterBrand}
                            />
                            <label for='samsung'>SAMSUNG</label>
                        </div>
                        <div>
                            <input type='checkbox' id='lg' name='lg' onChange={handleFilterBrand} />
                            <label for='lg'>LG</label>
                        </div>

                        <div>
                            <input
                                type='checkbox'
                                id='sony'
                                name='sony'
                                onChange={handleFilterBrand}
                            />
                            <label for='sony'>SONY</label>
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                id='asus'
                                name='asus'
                                onChange={handleFilterBrand}
                            />
                            <label for='asus'>ASUS</label>
                        </div>

                        <div>
                            <input
                                type='checkbox'
                                id='huw'
                                name='huwawei'
                                onChange={handleFilterBrand}
                            />
                            <label for='huw'>HUWAWEI</label>
                        </div>

                        <div>
                            <input type='checkbox' id='HP' name='hp' onChange={handleFilterBrand} />
                            <label for='hp'>HP</label>
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                id='HP'
                                name='apple'
                                onChange={handleFilterBrand}
                            />
                            <label for='apple'>APPLE</label>
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                id='acer'
                                name='acer'
                                onChange={handleFilterBrand}
                            />
                            <label for='acer'>ACER</label>
                        </div>
                    </div>
                    <div className='col-10 store-products-container d-flex'>
                        <div className='sort-controlbar-container'>
                            <label for='sort'>SORT BY : </label>
                            <select
                                name='sort-options'
                                id='sort-options'
                                value={sortedProducts}
                                onChange={handleSortChange}
                            >
                                <option value='default'>------</option>
                                <option value='lowest-price'>Lowest Price</option>
                                <option value='highest-price'>Highest Price</option>
                            </select>
                            <div className='total-products-container'>
                                {filterdProds.length === 0 && (
                                    <p className='total-products-text'>
                                        {" "}
                                        Total products in shop : {"("} {prods.length} {")"}{" "}
                                    </p>
                                )}
                                {filterdProds.length > 0 && (
                                    <p className='total-products-text'>
                                        {" "}
                                        Searched Brand Products: {"("} {filterdProds.length} {")"}{" "}
                                    </p>
                                )}
                            </div>
                        </div>

                        {filterdProds.length === 0 &&
                            currentProducts.map((product) => {
                                return <ProductCard product={product} key={product._id} />;
                            })}

                        {filterdProds.length > 0 &&
                            filterdProds.map((product) => {
                                return <ProductCard product={product} key={product._id} />;
                            })}
                        {filterdProds.length === 0 && (
                            <div
                                className={
                                    !isDarkMode
                                        ? "pagination-buttons-container pagination-buttons-container-dark"
                                        : "pagination-buttons-container"
                                }
                            >
                                <button
                                    className='prev-btn'
                                    onClick={handlePrevClick}
                                    disabled={activePage === 1}
                                >
                                    {" "}
                                    {"< "} Back{" "}
                                </button>
                                {pageNumbers.map((pageNumber) => (
                                    <button
                                        className={
                                            pageNumber === currentPage
                                                ? "active-page"
                                                : "unactive-page"
                                        }
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    className='next-btn'
                                    onClick={handleNextClick}
                                    disabled={activePage === pageNumbers.length}
                                >
                                    Next {"  >"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
