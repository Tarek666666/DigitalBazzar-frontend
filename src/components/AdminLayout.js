import React , {  useContext  }  from 'react';
import {Outlet } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

function Adminlayout() {

  const [theme , isDarkMode] = useContext(ThemeContext)
  
  return (
   <>
     <Outlet theme={theme} isDarkMode={isDarkMode}/>
   </>
  )
}

export default Adminlayout;