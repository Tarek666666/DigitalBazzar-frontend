import React , {useState , useContext}  from 'react'
import ProductCard from '../components/ProductCard';
import ProductsContext from '../context/ProductsContext';

function Pcs() {
  const [products , dispatch] = useContext(ProductsContext)
  let productsLoaded = products.products ? products.products : [];
  const [prodsAfterSearch , setProdsAfterSearch] = useState(productsLoaded.filter(prod => prod.category.toLowerCase() === 'pc'))

  return (
    <>
    <div className='container-xxl'>

        <div className='row'>
                <div className='col-10 search-prods-container d-flex py-5  mb-5 mt-5'>
                       <div className='searched-prods-header d-flex justify-content-center'> <h1 >Computers  </h1> <h4>Total of {'('} {prodsAfterSearch.length} {')'}</h4></div>
                    {prodsAfterSearch.length > 0 && prodsAfterSearch.map(product =>{
                        return <ProductCard product={product} key={product.id} />
                    })}
                </div>
        </div>
    </div>
</>
  )
}

export default Pcs