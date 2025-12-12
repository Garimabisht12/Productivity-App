import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { TiDelete } from 'react-icons/ti';
import { FaFire } from 'react-icons/fa';
import axios from '../api/axios'; // Assuming this path is correct

// --- Date Helpers (Reverted to Local Time Zone for Stability) ---

const toDateFromYMD = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number);
  // Important: Month is 0-indexed in Date constructor (m - 1)
  return new Date(y, m - 1, d); 
};

const ymdFromDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// --- Streak Calculation (Simplified) ---

const computeStreaks = (entriesYMD) => {
  const set = new Set(entriesYMD);
  const sorted = Array.from(set).sort();

  // Helper for date comparison
  const getDateDiffInDays = (date1, date2) => {
    // Rounding is crucial for date arithmetic
    return Math.round((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Longest Streak
  let longest = 0;
  let currentRun = 0;
  let prev = null;

  for (const day of sorted) {
    if (!prev) {
      currentRun = 1;
    } else {
      const prevDate = toDateFromYMD(prev);
      const curDate = toDateFromYMD(day);
      const diffDays = getDateDiffInDays(curDate, prevDate);

      if (diffDays === 1) currentRun += 1;
      else if (diffDays > 1) currentRun = 1; // Streak broken, start new streak
      // If diffDays is 0 (duplicate entry), currentRun remains the same.
    }
    longest = Math.max(longest, currentRun);
    prev = day;
  }

  // Current Streak
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today (local time)

  let curStreak = 0;
  let cursor = new Date(today);
  
  // Back-check, starting with today's date or before
  while (true) {
    const ymd = ymdFromDate(cursor);
    
    // Check for today or a previous day
    if (set.has(ymd)) {
      curStreak++;
    } else {
      // If we miss today's entry, check if yesterday was the last day
      // Only break if the day is not in the set AND it's not "tomorrow" (i.e. we are not past today).
      // A common flaw is not checking if the missed day is "yesterday."
      
      // If we are checking "today" (cursor === today) and it's missing, the streak is over/0.
      // If we are checking "yesterday" and it's missing, the streak is over.
      break;
    }
    
    // Move to the previous day
    cursor.setDate(cursor.getDate() - 1);
  }

  return { currentStreak: curStreak, longestStreak: longest };
};

// --- Custom CSS (Needed for Styling Fix) ---

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

// --- HabitTracker Component ---

const HabitTracker = ({ habit, setChanges }) => {
  const token = localStorage.getItem('token');
  const defaultClassNames = getDefaultClassNames();
  
  const [completedDates, setCompletedDates] = useState(
    Array.isArray(habit.entries) ? habit.entries : []
  );

  // Use useMemo for streaks to keep them updated and performant
  const { currentStreak, longestStreak } = useMemo(
    () => computeStreaks(completedDates), 
    [completedDates]
  );
  
  // Convert YMD strings to Date objects for the DayPicker component
  const selectedDates = useMemo(() => 
    Array.isArray(completedDates) ? completedDates.map(d => toDateFromYMD(d)) : [],
    [completedDates]
  );

  // --- FIX: Define Modifiers for DayPicker Styling ---
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0); // Local midnight
    return d;
  }, []);

  const modifiers = {
    // The 'completed' modifier applies the style to all selectedDates
    completed: selectedDates,
    // The 'today' modifier applies the style to the current day
    myToday: today, // Naming it 'myToday' for clarity
  };

  const modifiersClassNames = {
    completed: 'completed-day', // Maps the 'completed' modifier to your CSS class
    myToday: 'my-today',      // Maps the 'myToday' modifier to your CSS class
    // 'today' is a built-in modifier that gets overridden by 'myToday'
  };
  // ----------------------------------------------------


  const handleDayClick = async (day) => {
    // Ensure the date is cleaned to local midnight for consistent YMD conversion
    const dayCleaned = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const cur_day = ymdFromDate(dayCleaned);

    const updatedDates = completedDates.includes(cur_day)
      ? completedDates.filter(d => d !== cur_day)
      : [...completedDates, cur_day];

    setCompletedDates(updatedDates); // Optimistic UI update

    try {
      await axios.put(`/habits/${habit._id}`, { entries: updatedDates }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (setChanges) setChanges(prev => !prev);
    } catch (err) {
      console.error("Error updating habit:", err);
      // Optional: Revert setCompletedDates(updatedDates) if API fails
    }
  };

  const deleteHabit = async (habit_id) => {
    // Added confirmation for better UX
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    try {
      await axios.delete(`/habits/${habit_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (setChanges) setChanges(prev => !prev);
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  return (
    // UI Improvements: Use utility classes for better styling and accessibility
    <div className="container shadow-lg px-4 py-6 mb-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl">
      <style>{css}</style>

      {/* Delete Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => deleteHabit(habit._id)}
          aria-label="Delete habit"
          title="Delete Habit"
          className="text-2xl text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <TiDelete className="text-2xl" />
        </button>
      </div>

      {/* Habit Card (UI Refinement) */}
      <div className="max-w-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg shadow-md mx-auto my-6 p-5 transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <h5 className="mb-2 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {habit.title}
          </h5>
          <div className="flex flex-col gap-1 mt-4">
            <p className="font-semibold text-[var(--text-secondary)] flex justify-center items-center gap-2">
              <FaFire className="text-orange-500 text-lg" /> 
              Longest Streak: <span className="text-[var(--text-primary)] font-bold">{longestStreak}</span> days
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Current Streak: <span className="font-bold text-[var(--text-primary)]">{currentStreak}</span> days
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar flex justify-center mb-4 overflow-x-auto p-2">
        <DayPicker
          mode="multiple"
          selected={selectedDates}  
          onDayClick={handleDayClick}
          // Disabled dates after today (local time)
          disabled={{ after: today }} 
          showOutsideDays
          
          // FIX APPLIED: Use modifiers to apply custom classes
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          
          classNames={{
            // Style the main container (root)
            root: 'p-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] shadow-inner',
            // Style the header and days to respect theme variables
            caption_label: 'text-[var(--text-primary)] font-semibold',
            head_cell: 'text-[var(--text-tertiary)] uppercase text-xs',
            nav_button: 'fill-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded',
            chevron: `${defaultClassNames.chevron} fill-[var(--text-primary)]`,
            day: 'text-[var(--text-secondary)]',
            // Removed conflicting 'selected' and 'today' classes
          }}
        />
      </div>
    </div>
  );
};

export default HabitTracker;