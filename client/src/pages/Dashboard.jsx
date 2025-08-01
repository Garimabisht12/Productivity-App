import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import MainDash from '../components/MainDash'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
     const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
  }
  }, [])
  return (
    <>
      
      <div className=' '>
        {/* <div className="sidebar  ">
          <Sidebar />
        </div> */}
        
         <Navbar />
        <div className="main w-full">
          
        <MainDash />
        </div>
      </div>
    </>
  )
}

export default Dashboard

 {/* <Todopage /> */}
          {/* <Habit />
           <div className="flex flex-wrap justify-evenly">
           {habits.map((habit) => (
            <HabitTracker habit={habit}/>
            // <MyItem key={item.id} title={item.title} description={item.description} />
          ))}
        </div> */}
          {/* <Finance /> */}
          {/* <DisplayExpense  /> */}
          {/* <VisualFinance  /> */}