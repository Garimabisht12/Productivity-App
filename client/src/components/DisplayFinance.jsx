import React, { useEffect, useState } from 'react'
import DisplayIncome from './DisplayIncome'
import DisplayExpense from './DisplayExpense'
import { useAppContext } from '../contexts/AppContext';
import axios from '../api/axios';
import AddExpenses from './AddExpenses';
import AddIncome from './AddIncome';

const DisplayFinance = () => {
  const {expense, setExpense, income, setIncome, newEx, newIn} =  useAppContext()

  useEffect( () =>{
    const fetchFinance= async() =>{
    try{
      const token = localStorage.getItem('token')
      const res = await axios.get('/finance/expense', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resIncome = await axios.get('/finance/income', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpense(res.data)
      setIncome(resIncome.data)
      // console.log(resIncome.data)
    }
    catch(e) {
      console.log('error retrieving finance')
      console.log(e)
    }
  }
  fetchFinance();
  }, [newEx,newIn])
  return (

    <>
   
  <div className='flex flex-wrap'>
    
    {Object.keys(expense).length > 0 && <DisplayExpense expense={expense} setExpense={setExpense}/>}
    {Object.keys(income).length > 0 && <DisplayIncome income={income} setIncome={setIncome}/>}
    {Object.keys(expense).length === 0  && 
    <div className="newexpense mt-8">
 <p className='font-semibold'>Add Expense</p>
  <AddExpenses/>
    </div>
   }
    {Object.keys(income).length === 0  &&
    <div className="newincome ml-20 mt-8">
<p className='font-semibold'>Add Income</p> 
 <AddIncome/>
    </div>
    }
  </div>

      
    </>
  )
}

export default DisplayFinance