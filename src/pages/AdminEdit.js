import React , {useEffect , useState} from 'react'
import {useLocation , Link} from 'react-router-dom';

function AdminEdit() {

    const location = useLocation();
    const [name, setName] = useState(location.state.product.name);
    const [price, setPrice] = useState(location.state.product.price);
    const [image, setImage] = useState(location.state.product.image);
    const [description, setDescription] = useState(location.state.product.description);
    const [featured, setFeatured] = useState(location.state.product.featured);
    const [brand, setBrand] = useState(location.state.product.brand);
    const [category, setCategory] = useState(location.state.product.category);
    const [loading , setLoading] = useState(false);
    const [alert , setAlert] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [error , setError] = useState(false)

  
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
      setLoading(true)
      if(name === '' || image === '' || description === '' || brand === '' || category === '' ){
        setLoading(false)
        setError(true)
        setErrorMessage('Product Name, Image Url , Description , Brand , Catagory can not be empty')
      }else{
        fetch(`https://digital-bazzar-backend.herokuapp.com/admin/dashboard/editproduct/${location.state.product._id}` , {
          credentials: "include",
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify( {name , price , image , description , featured , brand , category} )
        })
       .then(res => res.json())
        .then(data => {
          // case product was succesfully updated
              setLoading(false)
              setAlert(true)
              setError(false)
              setTimeout(() => {
                  setAlert(false)
                window.location.href = '/dashboard/products'
              }, 1500);
        })
        .catch(err =>console.log(err))
      }
    }
    useEffect(()=>{
      setTimeout(() => {
        setError(false)
        setErrorMessage('')
      }, 2000);
    },[])


  return (
    <form className='admin-add-from' onSubmit={handleSubmit}>
       {error === true &&  <div className='alert-message'>
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
        <div className='submit-btn-container d-flex'>
       
               {!alert && <button className='add-new-product-btn mb-2' type="submit">
                EDIT PRODUCT
                </button>}
                {!alert && <Link className='back-link mb-2' to={'/dashboard/products'}>BACK</Link>}
                {alert && <button className='alert-added mb-4' type="submit">PRODUCT HAS BEEN UPDATED</button>}
                
        </div>
       
      </form>
  )
}

export default AdminEdit