// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Create provider
export const AppProvider = ({ children }) => {
  

  const [expense, setExpense] = useState([])
    const [totalE, setTotalE] = useState(0)
    const [habits, setHabits] = useState([]);
    

  return (
    <AppContext.Provider
      value={{
        expense,
        setExpense,
        totalE,
        setTotalE,
        habits, setHabits,
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context
export const useAppContext = () => useContext(AppContext);
