import React, { useState, useEffect } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { TiDelete } from 'react-icons/ti';
import { FaFire } from 'react-icons/fa';
import axios from '../api/axios';

const css = `
  .rdp-disabled {
    opacity: 1 !important;
  }  

  .completed-day .rdp-day_button {
    background-color: #00b37d !important;
    color: white !important;
    border-radius: 6px !important;
    border: none !important;
  }

  .my-today .rdp-day_button {
    border: 2px solid #007bff !important;
    font-weight: bold !important;
    color: #007bff !important;
    background: none !important;
  }
`;





const calculateStreaks = (entries = []) => {
  if (!entries || entries.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const dates = entries.map(d => new Date(d).setHours(0,0,0,0)).sort((a,b) => a-b);
  let longest = 1, temp = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = (dates[i] - dates[i-1]) / (1000*60*60*24);
    if (diff === 1) temp++; else if (diff > 1) temp = 1;
    if (temp > longest) longest = temp;
  }

  const today = new Date().setHours(0,0,0,0);
  const last = dates[dates.length-1];
  let current = 0;
  if (today === last || today - last === 24*60*60*1000) current = temp;

  return { currentStreak: current, longestStreak: longest };
};


const HabitTracker = ({ habit, setChanges }) => {
  const token = localStorage.getItem('token');
  const defaultClassNames = getDefaultClassNames();
  const [completedDates, setCompletedDates] = useState(
  Array.isArray(habit.entries) ? habit.entries : []
);


  const [longestStreak, setLongestStreak] = useState(habit.longestStreak || 0);
  const [currentStreak, setCurrentStreak] = useState(habit.currentStreak || 0);

 

// Safe mapping

const normalize = (d) => new Date(d).toLocaleDateString("en-CA");

  useEffect(() => {
    // recalc streaks whenever completedDates change
    if (completedDates){

      const { currentStreak: cs, longestStreak: ls } = calculateStreaks(completedDates);
      setLongestStreak(ls);
      setCurrentStreak(cs);
    }
      
  }, [completedDates]);
const handleDayClick = async (day) => {
  const cur_day = normalize(day);

  // normalize existing list
  const normalized = completedDates.map(normalize);

  let updatedDates;
  if (normalized.includes(cur_day)) {
    updatedDates = completedDates.filter(d => normalize(d) !== cur_day);
  } else {
    updatedDates = [...completedDates, cur_day];
  }

  setCompletedDates(updatedDates);

  try {
    await axios.put(`/habits/${habit._id}`, 
      { entries: updatedDates },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (setChanges) setChanges(prev => !prev);

  } catch (err) {
    console.error(err);
  }
};

  const deleteHabit = async (habit_id) => {
    try {
      await axios.delete(`/habits/${habit_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChanges(prev => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container shadow-md px-4 py-4 mb-16 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded">
      <style>{css}</style>

      {/* Delete Button */}
      <div className="btn flex justify-end">
        <button onClick={() => deleteHabit(habit._id)} aria-label="Delete" className="text-2xl text-[var(--text-primary)] hover:text-[var(--button-bg)] transition">
          <TiDelete className="text-2xl" />
        </button>
      </div>

      {/* Habit Card */}
      <div className="max-w-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg shadow-sm mx-auto my-4">
        <div className="p-5 text-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {habit.title}
          </h5>
          <p className="mb-3 font-normal text-[var(--text-secondary)] flex justify-center items-center gap-2">
            Longest Streak: <FaFire className="text-orange-500" /> {longestStreak} days
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">Current Streak: {currentStreak} days</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar flex justify-center mb-12 overflow-x-auto">
        <DayPicker
          mode="multiple"
          selected={completedDates}
          
          onDayClick={handleDayClick}
          disabled={{ after: new Date() }}
          showOutsideDays
          classNames={{
            today: `border-green-500`,
            selected: `bg-green-500 border-green-500 text-white`,
            chevron: `${defaultClassNames.chevron} fill-amber-500`,
          }}
        />
      </div>
    </div>
  );
};

export default HabitTracker;
