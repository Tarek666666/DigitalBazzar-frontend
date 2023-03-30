import React from 'react'
import { useState ,useEffect} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

function AdminAddNewProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [featured, setFeatured] = useState(false);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [loading , setLoading] = useState(false);
    const [alert , setAlert] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [error , setError] = useState(false)

  /*  async  function checkIsAdmin(){
      const {data} = await axios.get('https://digital-bazzar-backend.herokuapp.com/admin/dashboard' , {
           
      credentials: "include",
      method: "GET",
        });

      if(data.isAuth){
          console.log('you can see admin dashboard')
      }else{
          window.location.href = '/signin'
      }
    }
    */
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    };
  
    const handleImageChange = (e) => {
      setImage(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleFeaturedChange = (e) => {
      setFeatured(e.target.checked);
    };
  
    const handleBrandChange = (e) => {
      setBrand(e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // handle form submission here
      if(name === '' || image === '' || description === '' || brand === '' || category === '' ){
        setLoading(false)
        setError(true)
        setErrorMessage('Product Name, Image Url , Description , Brand , Catagory can not be empty')
      }
      else{
            setLoading(true)
            fetch('/admin/dashboard/addnewproduct' , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( {name , price , image , description , featured , brand , category} )
            })
          .then(res => res.json())
            .then(data => {
              // case product was succesfully added
              setError(false)
              if(data.msg === 'product added'){
                  setLoading(false)
                  setAlert(true)
                  setErrorMessage('Product is added')
                  setTimeout(() => {
                      setAlert(false)
                       
                      window.location.href = '/dashboard/products'
      
                  }, 2000);
                  console.log(data)
              }
            })
            .catch(err =>console.log(err))
      }
      
    };
    

    useEffect(() => {
   //   checkIsAdmin()
      setTimeout(() => {
        setError(false)
        setErrorMessage('')
      }, 2000);
    }, [error])
    
    return (
   
    <form className='admin-add-from' onSubmit={handleSubmit}>
       {error &&  <div className='alert-message'>
                        <p>{errorMessage}</p>
                  </div>}
        <div className='product-name-container'>
          <label className='pt-2'>Product Name</label>
          <input type="text" placeholder="Enter product name" value={name} onChange={handleNameChange} />
        </div>
        <div className='product-price-container'>
          <label>Price</label>
          <input type="number" id="price" name="price" step="0.01" min="0" placeholder="$ 0.00" required value={price} onChange={handlePriceChange} />

        </div>
        <div className='product-img-container'>
          <label>Product Image</label>
          <input type="text" placeholder="Enter product image URL" value={image} onChange={handleImageChange} />
        </div>
        <div className='product-descritpion-container'>
          <label>Description</label>
        
        <textarea id="description" name="description" rows="5" placeholder="Enter product description" value={description} onChange={handleDescriptionChange}></textarea>

        </div>
        <div className='product-featured-container'>
        <label>Featured</label>
          <input type="checkbox" checked={featured}  value={featured} onChange={handleFeaturedChange} />
        </div>
        <div className='product-brand-container'>
        <label>Brand</label>
          <input type="text"  placeholder="Enter product Brand"  value={brand} onChange={handleBrandChange} />
        </div>
        <div className='product-category-container'>
        <label>Category</label>
          <select name="category"   value={category} onChange={handleCategoryChange} >
                    <option value="">Select category</option>
                    <option value="laptop">Laptops</option>
                    <option value="pc">PC</option>
                    <option value="mobile">Mobiles</option>
                    <option value="accessoires">Accessories</option>
          </select>
        </div>
        <div className='submit-btn-container '>
       
               {!alert && <button className='add-new-product-btn mb-2' type="submit">
                ADD NEW PRODUCT
                </button>}
                {!alert && <Link className='back-link mb-2' to={'/dashboard'}>BACK</Link>}
                {alert && <button className='alert-added mb-4' type="submit">PRODUCT HAS BEEN ADDED TO SHOP</button>}
        </div>
      </form>
    );
}

export default AdminAddNewProduct

/**   */