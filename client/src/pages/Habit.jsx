import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Layout from '../components/Layout';

import HabitTracker from "../components/HabitTracker";
import AddHabbit from "../components/AddHabbit";
import axios from "../api/axios";

const Habit = () => {
  const { habits, setHabits } = useAppContext();
  const [changes, setChanges] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/", { replace: true });

    const fetchHabits = async () => {
      try {
        const res = await axios.get("/habits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setHabits(res.data);
      } catch (e) {
        console.error("Error fetching habits:", e);
      }
    };

    fetchHabits();
  }, [changes, token, navigate, setHabits]);
  console.log(habits)
const handleBack = () => {
    navigate('/dashboard', { replace: true });
  }
  return (

    
     <Layout title="User Dashboard">
      {/* <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="fixed top-24 left-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 active:translate-y-0 z-50"
          >
            ← Back
          </button>
        </div> */}
      <AddHabbit habits={habits} setHabits={setHabits} setChanges={setChanges} />
      <div className="grid grid-cols-3 gap-4">

      {
        habits.map((habit) =>{
        return (
          <li className="list-none mx-4" key={habit._id}>
          <HabitTracker habit={habit} setChanges={setChanges}/>
          </li>
        )
      })
      }
      </div>

     </Layout> 
    
  );
};

export default Habit;


