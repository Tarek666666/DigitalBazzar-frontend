import axios from 'axios'
import React , {useEffect , useState} from 'react'
import { useParams , Link } from 'react-router-dom'

function VerifyEmail() {

   const [valid , setValid] = useState(false)
    const param = useParams()
    
  useEffect(()=>{

    const verifyEmail = async () =>{
        try {
            
            const url = `http://localhost:3000/user/${param.id}/verify/${param.token}`
            const {data} = await axios.get(url)
            setValid(true)
        } catch (error) {
            setValid(false)
        }
    }
    verifyEmail()

  },[])  

  return (
    <div className='verf-container mt-4 mb-4'>
            {!valid && <h1>Something went wrong ! invalid link</h1>}
            {!valid && <Link className='link-verf' to={'/signin'}>RE-SEND EMAIL</Link>}
            {valid && <h1>Account successfully verified</h1>}
            {valid && <Link className='link-verf' to={'/signin'}>LOGIN PAGE</Link>}
    </div>
  )
}

export default VerifyEmail