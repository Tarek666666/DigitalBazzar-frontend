import React from 'react'
import { useState , useContext ,useEffect } from 'react';
import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import ThemeContext from '../context/ThemeContext';

function SwitchTheme() {
  // getting the values from theme context
  const [theme , isDarkMode, setTheme] = useContext(ThemeContext)

  useEffect(() => {

    // set the default to light
    setTheme('light')
   }, []); 

  return (
    <div className='col-1 form-check form-switch hidden-responsive  hidden-responsive-medium'>
          <div className={!isDarkMode ? 'switch-btn-container-dark hidden-responsive hidden-responsive-medium ' : 'switch-btn-container hidden-responsive hidden-responsive-medium '}>  
              <input
                  className={!isDarkMode ? 'dark-theme-button switch-btn  form-check-input' : 'switch-btn  form-check-input'}
                  type="checkbox"
                  id="theme-switch" 
                  
                  onChange={setTheme}
              />
              {isDarkMode ? <BsSunFill className='sun-icon' size={20} /> : <BsFillMoonStarsFill className='moon-icon' size={20} />}
          </div>  
    </div>
  );
}

export default SwitchTheme;
