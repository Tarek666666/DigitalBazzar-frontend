import React , {useState , useEffect} from 'react'
import '../css/accountPage.css';
import { Link , useNavigate } from 'react-router-dom';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [username, setusername] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [responseState , setResponseState] = useState({});
    const [error ,setError] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleEmailChange = (e)=>{
      setEmail(e.target.value.toLowerCase().trim())
    }
    const handlePasswordChange = (e)=>{
      setPassword(e.target.value)
    }
    const handleRePasswordChange = (e)=>{

      if(e.target.value.length === password.length || e.target.value.length > password.length  && e.target.value !== password){

        setError(true)
        setErrorMessage('Passwords Are not Match!')

      }else{
        setRePassword(e.target.value)
      }
        
    }
    const handleUserNameChange = (e)=>{
        setusername(e.target.value.toLowerCase().trim())
    }
    const handlePhoneChange = (e)=>{
        setPhone(e.target.value)
    }  
    const handleAdressChange = (e)=>{
        setAdress(e.target.value)
    }  
  
    const handleSubmit = (event) => {
      //handle user inputs errors ----//
      event.preventDefault();
      const regex =  /^[0-9\s]+$/; 
      const regexEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
    if(email.trim() === '' || username.trim() === ''){
      setError(true)
      setErrorMessage('Username & Email adress cant be empty !')

    } else if(regexEmail.test(email) === false){
      setError(true)
      setErrorMessage('Enter a Valid Email')
    }
    else if(password.trim() !== rePassword.trim()){
      setError(true)
      setErrorMessage('Passwords are not match!')
    }
    else if(password.length < 8 || password.includes(' ')){
      setError(true)
      setErrorMessage('Password Should be 8 charachtares at least, no spaces allowed')
    }else if(regex.test(phone) === false){
      setError(true)
      setErrorMessage('Phone number field should contain only numbers!')
    }
    else{
      fetch('https://digital-bazzar-backend.herokuapp.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email , username , phone , adress })
      }).then(res => res.json())
      .then(data => {

        setResponseState(data)
        //if user creation succeeded 
        if(data.status.success){
          setTimeout(()=>{
            navigate('/signin' , {state:{data:data}} )
          },2000)
        }else{
          setResponseState(data)
          setError(true);
        }
      })
      .catch(err => console.log(err))
    };
    }

    useEffect(()=>{
      setTimeout(()=>{
        setError(false);
        setErrorMessage('')
      },3000)

    },[responseState , error])
  return (
    <div className='container-xxl d-flex justify-content-center'>

        <form onSubmit={handleSubmit} action='/account' className='loging-form col-6 py-5 mt-5 mb-5'>
                      {error === true  && errorMessage.length > 0 && <p className='respons-state-msg-fail'>  {errorMessage} </p>}
                     {responseState.status && responseState.status.success === true && <p className='respons-state-msg-success'>verification link is send to : {responseState.status.body.email} !</p>} 
                     {error === true && responseState.status && errorMessage.length === 0  && <p className='respons-state-msg-fail'> Failed! {responseState.status.msg} </p>}    
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={handleUserNameChange} type="text" className="form-control" id="username" placeholder="Enter Your Username" />
                    </div>
                    <div className="form-group ">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleEmailChange} type="text" className="form-control" id="email" placeholder="Enter Email adress" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePasswordChange} type="password" className="form-control" id="password" placeholder="Type Your Password" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="re-password">retype Password</label>
                    <input onChange={handleRePasswordChange} type="password" className="form-control" id="re-password" placeholder="Retype Your Password" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="adress">Adress</label>
                    <input onChange={handleAdressChange} type="text" className="form-control" id="adress" placeholder="Street name" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="phone-number">Phone nubmer</label>
                    <input onChange={handlePhoneChange} type="text" className="form-control" id="phone-number" placeholder="telephone number" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3 " >Sign Up</button>
                    <Link className='text-black' to={'/signin'} > Login page </Link>
        </form>
   </div>
  )
}

export default Signup