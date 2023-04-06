import React , {useContext} from 'react' 
import {FaLocationArrow , FaFacebook , FaInstagram , FaGooglePlay , FaApple} from 'react-icons/fa'  
import {AiFillTwitterCircle , AiFillYoutube } from 'react-icons/ai' 
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

function Footer() {

  const [theme,isDarkMode] = useContext(ThemeContext)
  return (
    <>
    <div className={!isDarkMode ? 'subscribe-container subscribe-container-dark' : 'subscribe-container' }>
        
                          <FaLocationArrow size={25} color='white'/>  <span>Sign Up For Newsletter</span>
                          <input type="text" className="form-control subscribe-input"  placeholder='@ email adress'/>
                          <button type="button" class="btn btn-primary subscribe-btn"> SUBSCRIBE</button>          

    </div> 
    <div className={!isDarkMode ? 'footer-items-container footer-items-container-dark' : 'footer-items-container'}>
      <div className='container-xxl'>
                  <div className='row footer-responsive-container'>
                      <div className='col-3 contact-us-container'>
                          <h3>Contact Us</h3>
                          <p>Hackfortstraat 113</p>
                          <p>Zuid-Holland Den Haag</p>
                          <p>The Netherlands</p>
                          <p>+  31682565642</p>
                          <p>tarek.aljabr.official@gmail.com</p>
                          <section className='social-media-container'>
                              <a href='https://www.twitter.com' target="_blank"><AiFillTwitterCircle size={52}/></a>
                              <a href='https://www.facebook.com' target="_blank"><FaFacebook size={48}/></a>
                              <a href='https://www.youtube.com' target="_blank"><AiFillYoutube size={62}/></a>
                              <a href='https://www.instagram.com' target="_blank"><FaInstagram size={52}/></a>
                          </section>

                      </div>
                      <div className='col-2 info-container hidden-responsive'>
                            <h3>Information</h3>
                            <a>Privacy Ploicy</a>
                            <a>Refund Ploicy</a>
                            <a>Shipping Ploicy</a>
                            <a>Terms of service</a>
                      </div>
                      <div className='col-2 account-container hidden-responsive hidden-responsive-larg'>
                      <h3>Account</h3>
                            <a>Search</a>
                            <a>About us</a>
                            <a>Faq</a>
                            <a>Contact</a>
                      </div>
                      <div className='col-2 quick-link-container'>
                      <h3>Quick Links</h3>
                            <Link to={'/laptops'}>Laptops</Link>
                            <Link to={'/pcs'}>Pc's</Link>
                            <Link to={'/mobiles'}>Mobiels</Link>
                            <Link to={'/accessoires'}>Accessoires</Link>
                      </div>
                      <div className='col-3 our-app-container'>
                          <h3>Our App</h3>
                          <p>Download our app and get extra 25% discount !</p>
                          <div className='our-app-buttons-container'>

                              <button className='google-btn'><FaGooglePlay size={30} />Google Play</button>
                              <button className='apple-btn'><FaApple size={30}/> Apple Store</button>

                          </div>
                      </div>
                  </div>
      </div>
    </div>
    <div className={!isDarkMode ? 'last-footer-container last-footer-container-dark' : 'last-footer-container'}>
          <p>Copyright © 2023 Digital Bazaar. All Rights Reserved - powerd by <span className='owner-footer'>TJ</span></p>
    </div>
    </>
  )
}

export default Footer;