import React, { useEffect, useState } from 'react'
import AddHabbit from '../components/AddHabbit'
import HabitTracker from '../components/HabitTracker';
import Navbar from '../components/Navbar';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Habit = () => {
    const {habits, setHabits} = useAppContext()
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
    <div>
        
        <h1 className='text-center mt-10 mb-8 font-semibold text-[3em]'>Track Your activities :D</h1>
        <AddHabbit habits={habits} setHabits={setHabits} />
        <div className="flex flex-wrap justify-evenly">
           {habits.map((habit) => (
            <HabitTracker habit={habit}/>
            // <MyItem key={item.id} title={item.title} description={item.description} />
          ))}
        </div>
        
    </div>
    
    </>
  )
}

export default Habit