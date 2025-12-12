import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { TiDelete } from 'react-icons/ti';
import { FaFire } from 'react-icons/fa';
import axios from '../api/axios';

// --- Helper Functions (Keep these outside the component) ---

/**
 * Converts YYYY-MM-DD string to a Date object.
 * Note: Uses UTC midnight to avoid local time zone issues on date comparison.
 */
const toDateFromYMD = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number);
  // Using UTC date to prevent timezone shifts from changing the date
  return new Date(Date.UTC(y, m - 1, d));
};

/**
 * Converts a Date object to YYYY-MM-DD string.
 * Uses UTC components for consistency with toDateFromYMD.
 */
const ymdFromDate = (date) => {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * Computes current and longest streaks from an array of YYYY-MM-DD strings.
 * @param {string[]} entriesYMD - Array of dates in YYYY-MM-DD format.
 */
const computeStreaks = (entriesYMD) => {
  const set = new Set(entriesYMD);
  const sorted = Array.from(set).sort();

  // --- Longest Streak ---
  let longest = 0;
  let currentRun = 0;
  let prevDate = null;

  for (const day of sorted) {
    const curDate = toDateFromYMD(day);
    
    if (!prevDate) {
      currentRun = 1;
    } else {
      // Calculate difference in days (1000 * 60 * 60 * 24 is 1 day in milliseconds)
      const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentRun += 1;
      } else if (diffDays > 1) {
        currentRun = 1; // Streak broken, start new streak
      }
      // If diffDays is 0 (duplicate entry), currentRun remains the same.
    }
    
    longest = Math.max(longest, currentRun);
    prevDate = curDate;
  }

  // --- Current Streak (relative to 'yesterday' or 'today') ---
  // Create a UTC date for today's start
  const todayUTC = new Date();
  todayUTC.setUTCHours(0, 0, 0, 0);

  let curStreak = 0;
  let cursor = new Date(todayUTC);
  let checkedToday = false;
  
  // Check if today is completed first (essential for current streak logic)
  const todayYMD = ymdFromDate(todayUTC);
  if (set.has(todayYMD)) {
      curStreak++;
      checkedToday = true;
  }
  
  // Move cursor back one day to start checking yesterday
  cursor.setUTCDate(cursor.getUTCDate() - (checkedToday ? 1 : 0));
  
  // Back-check until the streak is broken
  while (true) {
    const ymd = ymdFromDate(cursor);
    if (set.has(ymd)) {
      curStreak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
        // If today was not logged, and yesterday was also not logged, the streak is 0.
        // If today was logged, and we hit a blank, streak is accurate.
        break;
    }
  }

  return { currentStreak: curStreak, longestStreak: longest };
};

// --- Custom CSS for DayPicker (No changes needed here) ---

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


// --- React Component ---

const HabitTracker = ({ habit, setChanges }) => {
  const token = localStorage.getItem('token');
  const defaultClassNames = getDefaultClassNames();
  
  const [completedDates, setCompletedDates] = useState(
    Array.isArray(habit.entries) ? habit.entries : []
  );

  // Derive streaks from state, not from habit props, 
  // to ensure they reflect the user's clicks immediately.
  const { currentStreak, longestStreak } = useMemo(
    () => computeStreaks(completedDates), 
    [completedDates]
  );
  
  // Memoize the Date objects for DayPicker, improving performance
  const selectedDates = useMemo(() => 
    Array.isArray(completedDates) ? completedDates.map(d => toDateFromYMD(d)) : [],
    [completedDates]
  );

  // --- FIX: Define Modifiers for DayPicker Styling ---
  const todayUTC = useMemo(() => {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);
      return d;
  }, []);

  const modifiers = {
    completed: selectedDates,
    today: todayUTC,
  };

  const modifiersClassNames = {
    completed: 'completed-day',
    today: 'my-today',
  };
  // ----------------------------------------------------


  const handleDayClick = async (day) => {
    // Ensure we use UTC for comparison consistency
    const dayUTC = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
    const cur_day = ymdFromDate(dayUTC);

    const updatedDates = completedDates.includes(cur_day)
      ? completedDates.filter(d => d !== cur_day)
      : [...completedDates, cur_day];

    setCompletedDates(updatedDates); // Optimistic UI update

    try {
      await axios.put(`/habits/${habit._id}`, { entries: updatedDates }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Trigger a global change refresh if provided
      if (setChanges) setChanges(prev => !prev);
    } catch (err) {
      console.error("Error updating habit:", err);
      // Optional: Revert state change here if the API call fails
    }
  };

  const deleteHabit = async (habit_id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    
    try {
      await axios.delete(`/habits/${habit_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Trigger a global change refresh
      if (setChanges) setChanges(prev => !prev);
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  return (
    <div className="container shadow-md px-4 py-4 mb-16 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded">
      <style>{css}</style>

      {/* Delete Button */}
      <div className="btn flex justify-end">
        <button
          onClick={() => deleteHabit(habit._id)}
          aria-label="Delete habit"
          className="text-2xl text-[var(--text-primary)] hover:text-red-500 transition"
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
            Longest Streak: <FaFire className="text-orange-500" /> **{longestStreak}**
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            Current Streak: **{currentStreak}** days
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar flex justify-center mb-12 overflow-x-auto">
        <DayPicker
          mode="multiple"
          selected={selectedDates}  
          onDayClick={handleDayClick}
          // Disabled dates after today (UTC midnight)
          disabled={{ after: todayUTC }} 
          showOutsideDays
          
          // --- FIX APPLIED HERE ---
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          
          classNames={{
            // Removed 'today' and 'selected' styling here to let 'modifiersClassNames' take effect
            chevron: `${defaultClassNames.chevron} fill-amber-500`,
            // Set styles for the calendar container/header if needed
            root: 'custom-calendar-root', 
            head: 'text-[var(--text-primary)]',
          }}
        />
      </div>
    </div>
  );
};

export default HabitTracker;