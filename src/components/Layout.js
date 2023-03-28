import React from 'react';
import {Outlet , useLocation} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useState , useContext ,useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';

function Layout({loggedUser}) {

  const [theme ] = useContext(ThemeContext)
   return (
        <>
            <Header theme={theme} loggedUser={loggedUser}/>
            <Outlet theme={theme}/>
            <Footer theme={theme}/>
        </>
   
  )
}

export default Layout;