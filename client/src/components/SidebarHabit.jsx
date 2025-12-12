import React, { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import axios from "../api/axios";

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

const SidebarHabit = ({ habit, setChanges }) => {
  const token = localStorage.getItem("token");
  const defaultClassNames = getDefaultClassNames();



  
  const [completedDates, setCompletedDates] = useState(habit.entries || []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // handle date toggle (add/remove)
  const handleDayClick = async (day) => {
    const clickedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(day.getDate()).padStart(2, "0")}`;

    let updatedDates;
    if (completedDates.includes(clickedDate)) {
      updatedDates = completedDates.filter((d) => d !== clickedDate);
    } else {
      updatedDates = [...completedDates, clickedDate];
    }

    setCompletedDates(updatedDates);

    try {
      await axios.put(
        `/habits/${habit._id}`,
        { entries: updatedDates },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (setChanges) setChanges((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center ">
      <style>{css}</style>

      {/* Habit Title */}
      <div className="TITLE bg-gray-800 w-100 py-4 text-white mb-3 text-center ">

      <h2 className="text-xl font-semibold ">
        {habit.title}
      </h2>
      <h4>currentStreak: {`${habit.currentStreak}`}</h4>
      <h5>Keep it up!</h5>

      </div>
    
      {/* Calendar */}
      <DayPicker
        mode="multiple"
        selected={[...completedDates.map((d) => new Date(d))]}
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
  );
};

export default SidebarHabit;
