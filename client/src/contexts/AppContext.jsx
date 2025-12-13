// src/context/AppContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
// Create context
const AppContext = createContext();

// Create provider
export const AppProvider = ({ children }) => {
  
const token = localStorage.getItem("token");

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])
    const [totalE, setTotalE] = useState(0)
    const [totalIncome, setTotalIncome] =  useState(0)
    const [habits, setHabits] = useState([]);
    const [newEx, setNewEx] = useState(false)
    
  const [newIn, setNewIn] = useState(false)

  // Update dark mode in localStorage and apply to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  
  useEffect(() => {
    
    const fetchHabits = async () => {
      try {
        const res = await axios.get("/habits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(token)
        if (Array.isArray(res.data)) setHabits(res.data);
      } catch (e) {
        console.error("Error fetching habits:", e);
      }
    };

    fetchHabits();
  }, []);


  return (
    <AppContext.Provider
      value={{
        income,
        setIncome,
        expense,
        setExpense,
        totalE,
        setTotalE,
        habits, setHabits,
        totalIncome,
        setTotalIncome,
        newEx, setNewEx,
        newIn, setNewIn,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context
export const useAppContext = () => useContext(AppContext);
