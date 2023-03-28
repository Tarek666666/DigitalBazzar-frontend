import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notfound-container py-5' >
        <h1>PAGE NOT FOUND  404 !</h1>
       <Link className='not-found-link' to={'/'}>Click here to go back to home</Link>
    </div>
  )
}

export default NotFound