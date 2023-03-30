import React from 'react'
import { useContext , useEffect  } from 'react';
import axios from 'axios';
import ProductsContext from '../context/ProductsContext';
import AdminProductCard from '../components/AdminProductCard';

function AdminProducts() {
    const [products , dispatch] = useContext(ProductsContext); 

   async function getProducts(){
        dispatch({type:'FETCH_PRODUCTS_REQUEST'})
        try {
           const {data} = await axios.get('https://digital-bazzar-backend.herokuapp.com/products/allproducts' , {

           credentials: "include",
           method: "GET",
           headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
     });
           dispatch({type:'FETCH_PRODUCTS_SUCCESS' , payload:data})
        } catch (error) {
           
        }
    }

    async  function checkIsAdmin(){
      fetch("https://digital-bazzar-backend.herokuapp.com/admin/dashboard", {
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
                if(data.isAuth){
                    //case user is existed and the role is admin
                    console.log('you can see admin dashboard')
                }else{
                   //case role is not admin or no user ==> redirect to signin page
                  window.location.href = '/signin'
                }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    useEffect(()=>{
       checkIsAdmin()
        getProducts()

    },[])
    
  return (
    <div className='container-xxl d-flex edit-prods-container  mt-5 mb-5'>
        <div className='row col-10 admin-products-container'>

            {products.loading && <h3>LOADING ..... </h3>}
           {products.products && !products.loading &&  products.products.map(prod => {
                return <AdminProductCard product={prod}/>
           })}
        </div>
    </div>
  )
}

export default AdminProducts