import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SidebarHabit from './SidebarHabit';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { habits } = useAppContext();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const location = useLocation();

  const handleHabitClick = (habit) => setSelectedHabit(habit);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-[var(--bg-secondary)] border-r border-[var(--border-color)] z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center h-20 px-4 border-b border-[var(--border-color)]">
          <AiIcons.AiOutlineClose
            onClick={() => setSidebarOpen(false)}
            className="text-3xl font-bold cursor-pointer text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
          />
        </div>

        {/* Main Pages Links */}
        <ul className="mt-4 w-full space-y-2 px-4">
          <li>
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded transition duration-200 text-[var(--text-primary)] ${
                location.pathname === '/dashboard' 
                  ? 'bg-[var(--bg-tertiary)] font-semibold' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/todos"
              className={`block px-4 py-2 rounded transition duration-200 text-[var(--text-primary)] ${
                location.pathname === '/todos' 
                  ? 'bg-[var(--bg-tertiary)] font-semibold' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Todos
            </Link>
          </li>
          <li>
            <Link
              to="/finance"
              className={`block px-4 py-2 rounded transition duration-200 text-[var(--text-primary)] ${
                location.pathname === '/finance' 
                  ? 'bg-[var(--bg-tertiary)] font-semibold' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Finance Tracker
            </Link>
          </li>
          <li>
            <Link
              to="/habit"
              className={`block px-4 py-2 rounded transition duration-200 text-[var(--text-primary)] ${
                location.pathname === '/habit' 
                  ? 'bg-[var(--bg-tertiary)] font-semibold' 
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Habit Tracker
            </Link>
          </li>
        </ul>
      </div>

      {/* Habit Panel
      {selectedHabit && (
        <>
          <div className="fixed top-24 left-64 rounded-2xl ml-4 z-50 shadow-lg transition-transform duration-300">
            <SidebarHabit habit={selectedHabit} />
          </div>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setSelectedHabit(null)}
          />
        </>
      )} */}
    </>
  );
};

export default Sidebar;
