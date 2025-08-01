import React, { useEffect, useState } from 'react'
import DisplayIncome from './DisplayIncome'
import DisplayExpense from './DisplayExpense'
import { useAppContext } from '../contexts/AppContext';
import axios from '../api/axios';

const DisplayFinance = () => {
  const {expense, setExpense} =  useAppContext()

  useEffect( () =>{
    const fetchExpense = async() =>{
    try{
      const token = localStorage.getItem('token')
      const res = await axios('/finance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpense(res.data)
    }
    catch(e) {
      console.log('error retrieving finance')
    }
  }
  fetchExpense();
  }, [expense])
  return (

    <>
   
  <div className='flex'>
    
    {Object.keys(expense).length > 0 && <DisplayExpense />}
    {/* <DisplayIncome /> */}
  </div>

      
    </>
  )
}

export default DisplayFinance