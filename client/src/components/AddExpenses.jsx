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
// localStorage.setItem("expenses", JSON.stringify(res.data))
    //   const newEx = {
    //   id:self.crypto.randomUUID(),
    //   title: newExpense,
    //   value: newExpenseValue
    // };
    // setExpense([...expense, newEx])
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

      <div className="form flex flex-col">
      <h1>Expenses</h1>
      <form action="">
        <input type="text" className='mr-8 border-5' value={newExpense} onChange={(e) => setNewExpense(e.target.value)} placeholder='Title' />
        <input type='number' placeholder='$' className='mr-5 border-5' value={newExpenseValue} onChange={(e) => setNewExpenseValue(+e.target.value)}/>
        <button className='border-5 px-4' onClick={addE}>okay</button>
      </form>

      </div>
      
    </div>
    
    </>
  )
}

export default AddExpenses