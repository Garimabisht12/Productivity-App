import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useAppContext();
  
  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login')
};

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] h-20 flex items-center px-4 py-4 w-full shadow-sm">
      <FaIcons.FaBars
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-2xl cursor-pointer text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition"
      />
      <h1 className="flex-1 text-center text-lg font-semibold text-[var(--text-primary)]">
        Productivity App
      </h1>
      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mx-2 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition duration-200"
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? (
          <BsSun className="text-xl text-[var(--text-primary)]" />
        ) : (
          <BsMoon className="text-xl text-[var(--text-primary)]" />
        )}
      </button>
      
      <button onClick={handleLogout} className='bg-[var(--button-bg)] text-[var(--text-primary)] px-4 py-2 rounded-lg hover:bg-[var(--button-hover)] transition duration-200 font-medium'>LOGOUT</button>
    </div>
  );
};

export default Navbar;
