import React, { useState } from 'react'
import Buttons from '../components/Buttons';
import { Link, replace, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password })
      const { token, username } = res.data;
      localStorage.setItem('token', token);
      // console.log(token, 'token')
      localStorage.setItem('username', username);
      navigate('/dashboard', { replace: true });
     
    } catch (e) {
      console.error(e.response?.data?.message || 'Login failed');
      setFailed(true)
    }
  }

   const handleBack = () => {
    navigate(-1);
  }


  const gotoSignup = () =>{
    navigate('/signup')

  }

  return (
    <>


      <div className='flex justify-center items-center h-screen bg-[var(--bg-primary)]' >
        <div className="w-full max-w-[400px] py-10 px-6 sm:px-12 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg shadow-md">
          <form action=""
            onSubmit={handleLogin}>

            <h1 className='text-3xl font-bold text-center mb-8'>Login</h1>
            <label htmlFor="email">
              <input type="email" onChange={e => setEmail(e.target.value)} value={email} className='w-full my-5 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-3 py-2' name="email" id="email" placeholder='Email ID' required />

            </label>

            <label htmlFor="password">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='mb-3 w-full bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-3 py-2' name="password" id="password" placeholder='Password' />

            </label>

            {/* <div className="text-sm remember text-[var(--text-secondary)] flex justify-between mt-4"> */}
              {/* <label htmlFor="" className="flex items-center gap-2"> */}
                {/* <input type="checkbox" name="" id="" />Remember me */}
              {/* </label> */}
              {/* <a href="#" className='text-[var(--button-bg)] hover:text-[var(--button-hover)]'>Forgot Password?</a> */}
            {/* </div> */}
            <div className='my-4'>

              <Buttons label='Login' size='md' className='w-full' />
            </div>
            <div className='text-sm text-[var(--text-secondary)] text-center'>

              <span>Don't have an account? <button onClick={gotoSignup} className='text-[var(--button-bg)] hover:text-[var(--button-hover)] font-semibold'>Register</button></span>
            </div>
            {
              failed && <div className="invalid text-sm text-red-500 mt-3">
            <p>Wrong credentials</p>

            </div>
            }
            
          </form>
          <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className=" px-4 py-3 bg-gray-200 text-gray-800 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:translate-y-[-2px] active:translate-y-0"
          >
            ← Back
          </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Login