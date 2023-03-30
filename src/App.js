import './css/App.css';
import './css/productDetails.css';
import axios from 'axios';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import { useState , useEffect  } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Search from './pages/Search';
import Laptops from './pages/Laptops';
import Account from './pages/Account';
import Pcs from './pages/Pcs';
import Mobiles from './pages/Mobiles';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Accessoires from './pages/Accessoires'
import AdminDashBoard from './pages/AdminDashBoard';
import { CartProvider } from './context/CartContext';
import {ThemeProvider} from './context/ThemeContext'
import {ProductsProvider} from './context/ProductsContext';
import Signup from './pages/Signup';
import AdminProducts from './pages/AdminProducts';
import Adminlayout from './components/AdminLayout';
import AdminAddNewProduct from './pages/AdminAddNewProduct';
import AdminEdit from './pages/AdminEdit';
import VerifyEmail from './components/VerifyEmail';
import ReSendEmail from './pages/ReSendEmail';
import CheckoutSuccess from './pages/CheckoutSuccess';
import OrdersPage from './pages/OrdersPage';
import NotFound from './pages/NotFound';
import MembersPage from './pages/MembersPage';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  
  const [loggedUser , setLoggedUser] = useState()

  useEffect(() => {
    fetch('https://digital-bazzar-backend.herokuapp.com/auth', { credentials: "include",
    method: "GET", })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.cart.length > 0){
        console.log('from fetch with credinteals' , data)
        setLoggedUser(data)
      }
      
    })
    .catch(console.log);




   /* async function fetchData() {
     const {data} = await axios.get('https://digital-bazzar-backend.herokuapp.com/auth');
     console.log(data , 'from app to auth / ')
     setLoggedUser(data)
    }
    fetchData();/* */

  }, []); 
  return (
    <ProductsProvider >
    <ThemeProvider>
         <CartProvider >
                <BrowserRouter >
                    <Routes>
                        <Route path='/' element={<Layout loggedUser={loggedUser} />}  > 
                          <Route index element={<Home />} />
                          <Route path='/user/:id/verify/:token' element={<VerifyEmail />} />
                          <Route path='/resend' element={<ReSendEmail/>}/>  
                          <Route path='/checkout-success' element={<CheckoutSuccess/>}/> 
                          <Route path='search/:searchKey' element={<Search/>}/>    
                          <Route path='laptops' element={<Laptops/>} /> Pcs
                          <Route path='pcs' element={<Pcs />} /> 
                          <Route path='mobiles' element={<Mobiles />} />
                          <Route path='accessoires' element={<Accessoires />} />
                          <Route path='products' element={<Products />}/>  
                          <Route path='productdetails/:id' element={<ProductDetails />}/>
                          <Route path='cart' element={<CartPage loggedUser={loggedUser} />}/> 
                          <Route path='signin' element={<Account loggedUser={loggedUser}/>}/>  
                          <Route path='signup' element={<Signup/>}/>  
                          <Route path='dashboard' element={<Adminlayout loggedUser={loggedUser}/>}>   
                              <Route index element={<AdminDashBoard />}/>
                              <Route path='products' element={<AdminProducts/>}/>
                              <Route path='addnewproduct' element={<AdminAddNewProduct/>}/>
                              <Route path='editproduct' element={<AdminEdit/>}/>
                              <Route path='orders' element={<OrdersPage/>}/> 
                              <Route path='members' element={<MembersPage/>}/>
                          </Route>
                          <Route path='*'  element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
              </CartProvider>
          </ThemeProvider>
      </ProductsProvider>
  );
}

export default App;
