import React, { useEffect, useState } from 'react'
import AddExpenses from '../components/AddExpenses'
import DisplayFinance from '../components/DisplayFinance'
import Navbar from '../components/Navbar'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from 'react-router-dom';
const Finance = () => {
  const { expense,
        setExpense,
        totalE,
        setTotalE, } = useAppContext();
  const navigate = useNavigate();
  let total = 0
  useEffect(()=>{
    const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
  }
      total = expense.reduce( (total, item) => total+item.value,0)
      setTotalE(total)
  }, [expense])
  
  return (
    <>
    <Navbar />
    <div>Finance</div>
    <div className="content flex">
      {/* <div className="sidebar ">
          <Sidebar />
    </div> */}
    <AddExpenses expense={expense} setExpense={setExpense}/>
    </div>
    <DisplayFinance />
    {/* <VisualFinance expense={expense} /> */}
    
    
    
    </>
  )
}

export default Finance