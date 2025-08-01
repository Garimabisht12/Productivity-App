import React, { useState } from 'react'
import Buttons from '../components/Buttons';
import { Link, replace, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
const SignUp = () => {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', {username, email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/dashboard', { replace: true });
     
    } catch (e) {
      console.error(e.response?.data?.message || 'Sign up failed');
      
    }
  }
  return (
    <>
    <div className=' flex justify-center items-center h-[100vh] ' >
        <div className="w-[400px] py-[40px] px-[50px] bg-[#EDEDED] text-[#333333]">
          <form action=""
            onSubmit={handleSignUp}>

            <h1 className='text-[2rem] font-bold text-center mb-8'>Sign up</h1>
            <label htmlFor="username">
              <input type='text' onChange={e => setUsername(e.target.value)} value={username} className=' w-full my-5' name="username" id="username" placeholder='username' required />

            </label>
            <label htmlFor="email">
              <input type="email" onChange={e => setEmail(e.target.value)} value={email} className=' w-full my-5' name="email" id="email" placeholder='Email ID' required />

            </label>

            <label htmlFor="password">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='mb-3 w-full' name="password" id="password" placeholder='Password' />

            </label>

            <div className='my-4 '>

              <Buttons label='Sign Up' size='sm' />
            </div>
            
            
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp



