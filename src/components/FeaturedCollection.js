import React from 'react'
import ProductCard from '../components/ProductCard';

// componenet to be as the featured products displayed on home page , admin can update it
function FeaturedCollection({featuredProds , isDarkMode}) {

    const card = document.querySelector('.one-product-container');
card.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

card.addEventListener('mouseenter', (e) => {
  card.style.transition = 'none';
});

card.addEventListener('mouseleave', (e) => {
  card.style.transition = 'all 0.5s ease';
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

  return (
        <div className={!isDarkMode ? 'featured-collection-conitaner-dark py-5 hidden-responsive' :'featured-collection-conitaner py-5 hidden-responsive'}>
                <div className='row d-flex justify-content-center'>
                    <div className='col-10'>
                        <h5 className={!isDarkMode ? 'fw-bold mt-5 py-3  text-white' : 'fw-bold mt-5 py-3  '}>Featured Collection</h5>
                    </div>
                </div>
                <div className='row featured-photos d-flex justify-content-center align-items-center'>
                    {featuredProds.map(product => {

                                    return    <ProductCard className='col-2' product={product} key={product.id}  />
                    })}
                </div>
        </div>
  )
}
export default FeaturedCollection