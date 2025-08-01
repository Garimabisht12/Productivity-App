import React from 'react'
import Buttons from '../components/Buttons'

const SignUp = () => {
  return (
    <>
    <div className="card">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create  an account.</p>
        <label htmlFor="username">
            <input type="text" placeholder='Username'/>
        </label>
        <label htmlFor="email">
            <input type="email" placeholder='Email ID'/>
        </label>
        <label htmlFor="password">
            <input type="password" placeholder='Password'/>
        </label>
        <label htmlFor="confirmPassword">
            <input type="password" placeholder='Confirm Password'/>
        </label>
        <select name="toc" id="">I accept the <a href="">Terms of Use</a>& <a href="">Privacy Policy.</a></select>

        <Buttons label='SignUp' />
    </div>
    
    </>
  )
}

export default SignUp