import React from 'react'

function HeroSection({isDarkMode}) {
  return (
    <div className={!isDarkMode ? 'hero-section-dark hidden-responsive ' : ' hidden-responsive'}>
    <div className={'hero-section'}>
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                      <div className='asus'></div>
                  </div>
                  <div class="carousel-item  ">
                      <div className='samsung'></div>
                  </div>
                  <div class="carousel-item ">
                      <div className='msi-dragon'></div>
                  </div>
                  
                  <div class="carousel-item ">
                      <div className='iphone'></div>
                  </div>
                </div>
          </div>
    </div>

    <div className={!isDarkMode ? 'super-collection-container-dark super-collection-container container-xxl hidden-responsive-medium hidden-responsive-larg' :'super-collection-container container-xxl hidden-responsive-medium hidden-responsive-larg'}>
        <div className='row '>

              <div className=' col-6 left-section-container'>

              <div id="carouselExampleDark" class="carousel carousel-dark slide special-section-carousel">
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                          <div class="carousel-item active" data-bs-interval="10000">
                            <img src="images/products/msi-laptop.png" class="d-block w-100" alt="msi"/>
                            <div class="carousel-caption d-none d-md-block">
                       
                                    <h5>Super charged</h5>
                                    <h1>Special Sale</h1>
                                    <p>From $ 1200 or $212/months</p>
                                    
                            </div>
                          </div>
                          <div class="carousel-item" data-bs-interval="2000">
                            <img src="images/products/acer-laptop.png" class="d-block w-100" alt="acer"/>
                            <div class="carousel-caption d-none d-md-block">
                                 <h5>15% OFF</h5>
                                    <h1>ACER pro max</h1>
                                    <p>From <span className='old-price'>$2200.00</span> to only <span className='new-price'>$1775.00</span></p>
                                    
                            </div>
                          </div>
                          <div class="carousel-item">
                            <img src="images/products/iphone-pro14.png" class="d-block w-100" alt="..."/>
                            <div class="carousel-caption d-none d-md-block">
                                    <h5>New Arrival</h5>
                                    <h1>Ipone Max</h1>
                                    <p>start from  $ 999.99</p>
                                    
                            </div>
                          </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
              </div>
              </div>
              <div className=' col-6 right-section-container'>

                                  <div>
                                    <img className='diff-color' src='images/products/iphone.png' alt='iphone' />
                                  </div>
                                  <div><img  src='images/products/razer-mouse.png ' alt='razer' /></div>
                                  <div><img src='images/products/msi-keyboard.png' alt='razer' /></div>
                                  <div><img className='diff-color' src='images/products/asus-pc.png ' alt='razer' /></div>
              </div>
        </div>
    </div>
    </div>
  )
}

export default HeroSection