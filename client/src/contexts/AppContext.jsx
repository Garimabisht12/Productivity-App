// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Create provider
export const AppProvider = ({ children }) => {
  

  const [expense, setExpense] = useState([{title: 'lalaland',value: 85, id: self.crypto.randomUUID()},{title: 'lalaland2',value: 55, id: self.crypto.randomUUID()}, {title: 'lalaland3',value: 45, id: self.crypto.randomUUID()}])
    const [totalE, setTotalE] = useState(0)
    const [habits, setHabits] = useState(['water 2L', 'Meditation']);
    

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
