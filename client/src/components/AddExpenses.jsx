import React, { useState } from 'react'
import axios from '../api/axios';
import { useAppContext } from '../contexts/AppContext';
const AddExpenses = ({setNewVal}) => {
  
  const [newExpense, setNewExpense] = useState('')
  const [newExpenseValue, setNewExpenseValue] = useState(0)

  const {setNewEx } = useAppContext();
   const addE = async (e) =>{
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const res = await axios.post('/finance/expense', {title: newExpense, value: newExpenseValue }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
    setNewVal((prev) => !prev)
    setNewEx((prev) => !prev)
    setNewExpense('')
    setNewExpenseValue('');


    } catch(e) {
console.error(e.response.data.message || 'expense adding failed');
console.log(e)
      alert('process expense adding failed');
    }
    
    
  }

  return (
    <>
      <div className="form ">
      <form action="" className='text-center'>
        <input type="text" className='mr-8 ' value={newExpense} onChange={(e) => setNewExpense(e.target.value)} placeholder='Title' />
        <input type='number' placeholder='$' className='mr-5 ' value={newExpenseValue} onChange={(e) => setNewExpenseValue(+e.target.value)}/>
        <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' onClick={addE}>okay</button>
        <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' type='button' onClick={() => setNewVal(prev => !prev)}>cancel</button>
        
      </form>
      </div>
      
    
    </>
  )
}

export default AddExpenses