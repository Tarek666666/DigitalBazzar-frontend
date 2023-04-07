import React, { useState, useEffect } from "react";
import "../css/accountPage.css";
import { Link, useNavigate } from "react-router-dom";

// function to send the email verification again to users email
function ReSendEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://digital-bazzar-backend.herokuapp.com/user/resend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success === true) {
                    setError(false);
                    setErrorMessage(data.msg);
                    setTimeout(() => {
                        navigate("/signin");
                    }, 2500);
                } else {
                    setError(true);
                    setErrorMessage(data.msg);
                }

                console.log(data);
                //handle error
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
        console.log(errorMessage);
    }, [errorMessage]);

    return (
        <div className='container-xxl d-flex justify-content-center'>
            <form onSubmit={handleSubmit} className='loging-form col-6 py-5 mt-5 mb-5'>
                {error && errorMessage.length > 0 && (
                    <p className='respons-state-msg-fail'> {errorMessage} </p>
                )}
                {!error && errorMessage.length > 0 && (
                    <p className='respons-state-msg-success'> {errorMessage} </p>
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
                <button type='submit' className='btn btn-primary w-100 mt-3'>
                    RESEND LINK
                </button>
                <div className='text-center mt-3'></div>
                <div className='text-center mt-3'>
                    <Link className='text-black' to={"/signin"}>
                        LOGIN PAGE
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ReSendEmail;
