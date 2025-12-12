import React, { useState } from 'react'
import Buttons from './Buttons';
import axios from '../api/axios';
import { useEffect } from 'react';

const AddHabit = ({ habits, setHabits, setChanges}) => {
  const [new_habit, setNewHabit] = useState('');

  const token = localStorage.getItem("token");
  const addHabit = async() => {

    if (new_habit.trim() === '') return;
try{
const res = await axios.post('/habits', {title: new_habit, entries: [] }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
    setChanges((prev) => !prev)
    setHabits([...habits, [res.data]]);
    setNewHabit('');
}
  catch(e) {
console.error(e.response.data.message || 'habit adding failed');
console.log(e)
     
    }

  }
  return (
    <>
     
      <div className='flex flex-col justify-center items-center'>
        <div className=" mt-10  w-[40vw] py-7 pb-15">
          <div className="heading mb-6 font-medium text-center text-[2em]">
            <h2> New Habit</h2>
          </div>
          <div className="form text-center">
            <input className='p-1.5' type="text" value={new_habit} onChange={(e) => setNewHabit(e.target.value)} placeholder='Enter new habit' />
            <button className='ml-2 bg-[#000] text-[#fff] rounded-full py-1 px-4' onClick={addHabit}> Add </button>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default AddHabit