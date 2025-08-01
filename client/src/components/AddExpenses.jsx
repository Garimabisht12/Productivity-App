import React, { useState } from 'react'
import axios from '../api/axios';
const AddExpenses = ({expense, setExpense}) => {
  
  const [newExpense, setNewExpense] = useState('')
  const [newExpenseValue, setNewExpenseValue] = useState(0)
  const addE = async (e) =>{
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const res = await axios.post('/finance', {title: newExpense, value: newExpenseValue }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
    console.log(expense)
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
    <div>

      <div className="form flex flex-col justify-center items-center">
        <div className=" mt-10 shadow-md w-[40vw] py-7 pb-15 ml-100">
      <h1 className='heading mb-6 font-medium text-center text-[2em]'>Expenses</h1>
      <form action="" className='text-center'>
        <input type="text" className='mr-8 border-5' value={newExpense} onChange={(e) => setNewExpense(e.target.value)} placeholder='Title' />
        <input type='number' placeholder='$' className='mr-5 border-5' value={newExpenseValue} onChange={(e) => setNewExpenseValue(+e.target.value)}/>
        <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' onClick={addE}>okay</button>
      </form>

</div>
      </div>
      
    </div>
    
    </>
  )
}

export default AddExpenses