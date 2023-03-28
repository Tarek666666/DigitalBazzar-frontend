import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import ProductsContext from "../context/ProductsContext";

function Search() {
    let { searchKey } = useParams();
    const [products] = useContext(ProductsContext);

    const [prodsAfterSearch, setProdsAfterSearch] = useState(
        products.products.filter((prod) => {
            if (
                prod.name
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(searchKey.toLowerCase().split(" ").join("")) ||
                prod.brand
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(searchKey.toLowerCase().split(" ").join("")) ||
                prod.category
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(searchKey.toLowerCase().split(" ").join(""))
            ) {
                return prod;
            }
        })
    );
    useEffect(() => {
        setProdsAfterSearch(
            products.products.filter((prod) => {
                if (
                    prod.name
                        .toLowerCase()
                        .split(" ")
                        .join("")
                        .includes(searchKey.toLowerCase().split(" ").join("")) ||
                    prod.brand
                        .toLowerCase()
                        .split(" ")
                        .join("")
                        .includes(searchKey.toLowerCase().split(" ").join("")) ||
                    prod.category
                        .toLowerCase()
                        .split(" ")
                        .join("")
                        .includes(searchKey.toLowerCase().split(" ").join(""))
                ) {
                    return prod;
                }
            })
        );
    }, [searchKey]);

    return (
        <>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-10 search-prods-container d-flex py-5  mb-5 mt-5'>
                        <h5 className='searched-prods-header'>
                            There Are {"("}
                            {prodsAfterSearch.length}
                            {")"} products found!
                        </h5>
                        {prodsAfterSearch.length > 0 &&
                            prodsAfterSearch.map((product) => {
                                return <ProductCard product={product} key={product.id} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
