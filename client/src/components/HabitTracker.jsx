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

const toDateFromYMD = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const ymdFromDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const computeStreaks = (entriesYMD) => {
  const set = new Set(entriesYMD);

  // longest streak
  const sorted = Array.from(set).sort();
  let longest = 0;
  let currentRun = 0;
  let prev = null;

  for (const day of sorted) {
    if (!prev) {
      currentRun = 1;
    } else {
      const prevDate = toDateFromYMD(prev);
      const curDate = toDateFromYMD(day);
      const diffDays = Math.round((curDate - prevDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) currentRun += 1;
      else currentRun = 1;
    }
    longest = Math.max(longest, currentRun);
    prev = day;
  }

  // current streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let curStreak = 0;
  let cursor = new Date(today);

  while (true) {
    const ymd = ymdFromDate(cursor);
    if (set.has(ymd)) {
      curStreak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }

  return { currentStreak: curStreak, longestStreak: longest };
};

const HabitTracker = ({ habit, setChanges }) => {
  const token = localStorage.getItem('token');
  const defaultClassNames = getDefaultClassNames();
  
  const [completedDates, setCompletedDates] = useState(
  Array.isArray(habit.entries) ? habit.entries : []
);

  const [longestStreak, setLongestStreak] = useState(habit.longestStreak || 0);
  const [currentStreak, setCurrentStreak] = useState(habit.currentStreak || 0);

  const selectedDates = Array.isArray(completedDates)
  ? completedDates.map(d => toDateFromYMD(d))
  : [];


  useEffect(() => {
    const { currentStreak: cs, longestStreak: ls } = computeStreaks(completedDates);
    setCurrentStreak(cs);
    setLongestStreak(ls);
  }, [completedDates]);

  const handleDayClick = async (day) => {
    const cur_day = ymdFromDate(day);

    const updatedDates = completedDates.includes(cur_day)
      ? completedDates.filter(d => d !== cur_day)
      : [...completedDates, cur_day];

    setCompletedDates(updatedDates);

    try {
      await axios.put(`/habits/${habit._id}`, { entries: updatedDates }, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        <button
          onClick={() => deleteHabit(habit._id)}
          aria-label="Delete"
          className="text-2xl text-[var(--text-primary)] hover:text-[var(--button-bg)] transition"
        >
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
            Longest Streak: <FaFire className="text-orange-500" /> {longestStreak}
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            Current Streak: {currentStreak} days
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar flex justify-center mb-12 overflow-x-auto">

        <DayPicker
  mode="multiple"
  selected={selectedDates}
  onDayClick={handleDayClick}
  modifiers={{ completed: selectedDates }}
  modifiersClassNames={{
    completed: "completed-day"
  }}
/>

        {/* <DayPicker
          mode="multiple"
          selected={selectedDates}   
          onDayClick={handleDayClick}
          disabled={{ after: new Date() }}
          showOutsideDays
          classNames={{
            today: `border-green-500`,
            selected: `bg-green-500 border-green-500 text-white`,
            chevron: `${defaultClassNames.chevron} fill-amber-500`,
          }}
        /> */}
      </div>
    </div>
  );
};

export default HabitTracker;
