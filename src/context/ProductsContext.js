import {createContext,  useEffect , useReducer} from 'react';
import reducer from '../reducers/ProductsReducer';
import axios from "axios";

const ProductsContext = createContext();

export function ProductsProvider({children}){
const [products, dispatch] = useReducer(reducer , [])

async function bringProdsFirstTime(){
   
    dispatch({type:'FETCH_PRODUCTS_REQUEST'})

     try {

        const {data} = await axios.get('https://digital-bazzar-backend.herokuapp.com/products/allproducts');
        dispatch({type:'FETCH_PRODUCTS_SUCCESS' , payload:data})
        
     } catch (error) {
        
     }
    
}

useEffect(()=>{
   
    bringProdsFirstTime()
   
  },[])
return (

    <ProductsContext.Provider value={[products , dispatch]}>
       {children}
    </ProductsContext.Provider>
)
}

export default ProductsContext;
