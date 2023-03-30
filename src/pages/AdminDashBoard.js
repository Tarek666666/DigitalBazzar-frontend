import React from 'react';
import { useEffect , useState , useContext } from 'react'; 
import {HiUsers} from 'react-icons/hi' 
import {SiShopify} from 'react-icons/si'  
import {BsFileTextFill} from 'react-icons/bs'
import {ImBoxAdd} from 'react-icons/im'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/adminDashBoard.css'
import ThemeContext from '../context/ThemeContext';


function AdminDashBoard() {

    const [theme , isDarkMode, setTheme] = useContext(ThemeContext)

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
      },[])  
  return (
    <div className='container-xxl  mt-5 mb-5'>
        <div className={theme==='dark' ? 'row col-12 admin-dashboard-container-dark' :'row col-12 admin-dashboard-container'}>
                            <div className='col-3 icon-link-container py-3 hidden-responsive hidden-responsive-medium'>
                                <HiUsers className='dashboard-icon' size={100} />
                                <Link className='dashboard-link'to={'/dashboard/members'} >MEMBERS</Link>
                            </div>
                            <div className='col-3 icon-link-container py-3'>
                                <ImBoxAdd className='dashboard-icon' size={100}/>
                                <Link className='dashboard-link' to={'/dashboard/addnewproduct'}>ADD NEW PRODUCT</Link>
                            </div>
                            <div className='col-3 icon-link-container py-3'>
                                <SiShopify className='dashboard-icon' size={100}/>
                                <Link className='dashboard-link' to={'/dashboard/products'}>PRODUCTS</Link>
                            </div>
                            <div className='col-3 icon-link-container py-3  hidden-responsive hidden-responsive-medium'>
                                
                                <BsFileTextFill className='dashboard-icon ' size={100}/>
                                <Link className='dashboard-link' to={'/dashboard/orders'}>ORDERS</Link>
                            </div>
                            
        </div>
    </div>
  )
}

export default AdminDashBoard