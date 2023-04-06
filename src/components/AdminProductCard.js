import React from 'react'
import {AiTwotoneEdit} from 'react-icons/ai'  
import {MdDeleteForever} from 'react-icons/md'
import { useNavigate } from "react-router-dom";


// the Special item card for admin which includes the Edit/Delete buttons
function AdminProductCard({product}) {

    const navigate = useNavigate();
      //when admins delete a product from shop ---------------------------------------- >>
      function handleDeleteProduct(id){

              fetch('https://digital-bazzar-backend.herokuapp.com/admin/dashboard/deleteproduct', {
                credentials: "include",
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ id })
              })
              .then(res =>{
              return res.json()
              })
              .then(data => {
                window.location.href = '/dashboard/products'
              })
            .catch(err => console.log(err))
          }

          //when admins update a product ---------------------------------------- >>
          function handleEditProduct(id){

            fetch(`https://digital-bazzar-backend.herokuapp.com/admin/dashboard/editproduct/${id}` , {
              credentials: "include",
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              }
            })
            .then(res => res.json())
            .then(data =>{
                navigate('/dashboard/editproduct' , {state:{product:data}})
            })
            .catch(err => console.log(err))
        }
  return (
    <div className='admin-product-card   py-3'>
    <img src={product.image} />
    <p className='brand'>{product.brand}</p>
    <p className='name'>{product.name}</p>
    <p className='description'>{product.description}</p>
    <p  className='price'>$ {product.price}</p>
    <p>Rating : {product.rating}</p>
    <div className='admin-buttons-container'>
            <button className='admin-edit-btn' onClick={()=>handleEditProduct(product._id)}>
                <AiTwotoneEdit className='edit-admin-icon'   size={21}/>
            </button>
            <button className='admin-delete-btn' onClick={()=>handleDeleteProduct(product._id)}>
                <MdDeleteForever className='delete-admin-icon'  size={21}/>
            </button>
     </div>
     <p className='created-by'>CREATED BY : <span>{product.createdBy}</span></p>
</div>
  )
}

export default AdminProductCard