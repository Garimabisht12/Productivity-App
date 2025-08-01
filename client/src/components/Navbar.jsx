import React from 'react'
import Login from './Login'
import Buttons from './Buttons'

import { useNavigate } from 'react-router-dom';

import '../app.css'
const Navbar = () => {
  const navigate = useNavigate()

  const gotoes = (e) => {
    const vl = e.target.value;

    navigate(`/${vl}`)
  }
  const logout = () =>{
     localStorage.removeItem("token");
  navigate("/", { replace: true });
  }
  return (

    <>
      <div className='flex justify-between mx-8 my-4'>
        {/* <Buttons label={'Menu'}/> */}
        {/* <h2 className='text-3xl font-medium tracking-wider '>Productivity</h2> */}
        <button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'dashboard'} onClick={gotoes}>Dashboard </button>
        <button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'todos'} onClick={gotoes}>Todos </button>
        <button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'finance'} onClick={gotoes}>Finances </button>
        <button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'habit'} onClick={gotoes}>Habits </button>
        <button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'logout'} onClick={logout}>logout </button>
        {/* <button clas sName='hover:bg-gray-300  py-1 px-4 rounded-lg' onClick={() => console.log(1)}>Settings </button> */}

        {/* <Buttons label={'logout'} onClick={logout} /> */}
       
      </div>

    </>
  )
}

export default Navbar