import React , {useState , useContext , useEffect}from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ThemeContext from '../context/ThemeContext';
import axios from 'axios';

function ProductDetails() {
   // Get the product ID from the URL parameters
  let  {id}  = useParams();
  const [product ,setProduct] = useState({}) 
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const [items, localCart, total,addToCart] = useContext(CartContext)
  const [theme,isDarkMode,setTheme] = useContext(ThemeContext)


useEffect(() => {
  async function fetchData() {
   
    setLoading(true)
    try {
      const data = await axios.get(`https://digital-bazzar-backend.herokuapp.com/products/productdetails/${id}`);
      setProduct(data.data)
      setLoading(false)

      console.log(data.data)
      
    } catch (error) {
      //later will do the error handeler
      console.log('failed to fetch data')
    }
  }
  fetchData();
}, []);
    
    return (
      <div className={!isDarkMode ? 'main-container main-container-dark py-5' :'main-container py-5' } >
           
           {loading &&  <div className={!isDarkMode ? 'product-details-container-dark d-flex' :'product-details-container d-flex'}>
               <div className='details-img-container'>
                <h3></h3>
               </div>
               <div className='details-info-container'>
                        <h5>loading</h5>
                        <p className='details-info-name'></p>
                        <p className='details-info-desc'></p>
                        <div className='buttons-container'>
                           
                        </div>
               </div>
            </div>}
            {!loading &&  <div className={!isDarkMode ? 'product-details-container-dark d-flex' :'product-details-container d-flex'}>
               <div className='details-img-container'>
                <img className=' h-75' src={product.image}/>
               </div>
               <div className='details-info-container'>
                        <h5>{product.brand}</h5>
                        <p className='details-info-name'>{product.name}</p>
                        <p className='details-info-desc'>{product.description}</p>
                        <div className='buttons-container'>
                            <button onClick={()=>addToCart(product)} className={!isDarkMode ? 'add-cart-btn add-cart-btn-dark' : 'add-cart-btn'}  >ADD TO CART</button>
                            <Link className='view-details-btn' onClick={()=>navigate(-1)} >BACK</Link>
                        </div>
               </div>
            </div>}
      </div>
    );
}

export default ProductDetails