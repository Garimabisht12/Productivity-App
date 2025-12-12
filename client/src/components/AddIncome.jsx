import React, { useState } from 'react'
import axios from '../api/axios';
import { useAppContext } from '../contexts/AppContext'
const AddIncome = ({setNewIn}) => {
  
  const [newIncome, setNewIncome] = useState('')
  const [newIncomeValue, setNewIncomeValue] = useState(0)
  const { setIncome, setNewEx } = useAppContext()
  const addInc = async (e) =>{
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const res = await axios.post('/finance/income', {title: newIncome, value: newIncomeValue }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
 console.log("Income response:", res.data);
    setIncome((prev) => [...prev, res.data])
    setNewIncome(''); 
    setNewIncomeValue(0);
    setNewIn((prev) => !prev)
    // setNewEx((prev) => !prev)
  // console.log(newIncome, newIncomeValue)

    } catch(e) {
console.error(e.response?.data?.message || 'income adding failed');
console.log(e)
      alert('process income adding failed');
    }
    
    
  }

  return (
    <>
    <div>

      <div className="form ">
        <div className="">
      {/* <h1 className='heading mb-6 font-medium text-center text-[2em]'>Income</h1> */}
      <form action="" className='text-center'>
        <input type="text" className='mr-8 ' value={newIncome} onChange={(e) => setNewIncome(e.target.value)} placeholder='Title' />
        <input type='number' placeholder='$' className='mr-5' value={newIncomeValue} onChange={(e) => setNewIncomeValue(+e.target.value)}/>
        <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' type='submit' onClick={addInc}>Add</button>
        <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' type='button' onClick={() => setNewIn(false)}>cancel</button>
        
      </form>

</div>
      </div>
      
    </div>
    
    </>
  )
}

export default AddIncome;