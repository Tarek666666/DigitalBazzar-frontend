import React, { useState, useEffect } from "react";
import "../css/accountPage.css";
import { Link, useNavigate } from "react-router-dom";

function Account({ loggedUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://digital-bazzar-backend.herokuapp.com/user/signin", {
            method: "POST",
            credentials: 'include' ,
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({ password, email }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    window.localStorage.setItem("token", data.token);
                    console.log(data);
                   window.location.href = "./";
                } else {
                    setError(true);
                    setErrorMessage(data.msg);
                   
                }

                //handle error
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        fetch("https://digital-bazzar-backend.herokuapp.com/user/signout", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
            //    console.log(res);
                return res;
            })
            .then((data) => {

                console.log(data , 'cookies should be deleted ')
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
             //  window.location.href = "./";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 2000);
    }, [error]);

    return (
        <div className='container-xxl d-flex justify-content-center'>
            {!loggedUser && (
                <form onSubmit={handleSubmit} className='loging-form col-6 py-5 mt-5 mb-5'>
                    {error === true && errorMessage.length > 0 && (
                        <p className='respons-state-msg-fail'> {errorMessage} </p>
                    )}
                    <div className='form-group '>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleEmailChange}
                            type='text'
                            className='form-control'
                            id='email'
                            placeholder='Enter Email adress'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handlePasswordChange}
                            type='password'
                            className='form-control'
                            id='password'
                            placeholder='Enter password'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary w-100 mt-3'>
                        Sign In
                    </button>
                    <div className='text-center mt-3'>
                        <Link className='text-black' to={"/resend"}>
                            Didn't Receive Verification Link?
                        </Link>
                    </div>
                    <div className='text-center mt-3'>
                        <Link className='text-black' to={"/signup"}>
                            Sign Up for a New Account
                        </Link>
                    </div>
                </form>
            )}

            {loggedUser && (
                <form onSubmit={handleLogout} className='loging-form col-6 py-5 mt-5 mb-5'>
                    
                    <button type='submit' className='btn btn-primary w-100 mt-3'>
                        Logout
                    </button>
                </form>
            )}
        </div>
    );
}

export default Account;
