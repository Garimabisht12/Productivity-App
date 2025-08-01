import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TodoPage from '../components/Todopage'
import { useNavigate } from 'react-router-dom'
const Todos = () => {
  const navigate = useNavigate();
  useEffect(()=>{
     const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
  }
  }, [])
  return (
    <>
    <Navbar />
    <TodoPage />
    </>
  )
}
export default Todos;