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
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/dashboard', { replace: true });
      // console.log('xfdsfdg')
    } catch (e) {
      console.error(e.response?.data?.message || 'Login failed');
      setFailed(true)
    }
  }

  return (
    <>


      <div className=' flex justify-center items-center h-[100vh] ' >
        <div className="w-[400px] py-[40px] px-[50px] bg-[#EDEDED] text-[#333333]">
          <form action=""
            onSubmit={handleLogin}>

            <h1 className='text-[2rem] font-bold text-center mb-8'>Login</h1>
            <label htmlFor="email">
              <input type="email" onChange={e => setEmail(e.target.value)} value={email} className=' w-full my-5' name="email" id="email" placeholder='Email ID' required />

            </label>

            <label htmlFor="password">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='mb-3 w-full' name="password" id="password" placeholder='Password' />

            </label>

            <div className="text-[15px] remember text-[#666666] flex justify-between mt-4">
              <label htmlFor="">
                <input type="checkbox" name="" id="" />Remember me
              </label>
              <a href="#" className='text-blue-500'> Forgot Password?</a>
            </div>
            <div className='my-4 '>

              <Buttons label='Login' size='sm' />
            </div>
            <div className='text-[12px] text-[#666666] '>

              <a href="#" className=''>Don't have an account? Register</a>
            </div>
            {
              failed && <div className="invalid text-[12px] text-[#c30010] ">
            <p>Wrong credentials</p>

            </div>
            }
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Login