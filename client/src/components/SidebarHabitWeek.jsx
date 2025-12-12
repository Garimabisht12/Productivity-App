import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import axios from '../api/axios';

function SidebarHabitWeek({ habit }) {
  if (!habit) return null;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState(habit.entries || []);
  const [isEdited, setIsEdited] = useState(false); // track unsaved changes
  const { setHabits } = useAppContext();
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    setCompletedDates(habit.entries || []);
  }, [habit.entries]);

  const toggleDate = (date) => {
    const dateStr = date.toDateString();
    setCompletedDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((d) => d !== dateStr)
        : [...prev, dateStr]
    );
    setIsEdited(true); 
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `/habits/${habit._id}`,
        {
          title: habit.title,
          type: habit.type,
          entries: completedDates,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setHabits((prev) =>
        prev.map((h) => (h._id === habit._id ? res.data : h))
      );

      setIsEdited(false);
    } catch (e) {
      console.log('Error updating habit:', e);
    }
  };

  const getWeekDates = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay()); 
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="rounded-lg scale-90 p-4">
      {/* Day Names */}
      <div className="flex justify-between mb-1">
        {weekDates.map((date) => (
          <div key={date.toDateString()} className="text-sm text-center w-8">
            {dayNames[date.getDay()]}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="flex justify-between mb-2">
        {weekDates.map((date) => {
          const isCompleted = completedDates.includes(date.toDateString());
          return (
            <div
              key={date.toDateString()}
              onClick={() => toggleDate(date)}
              className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer transition ${
                isCompleted ? 'bg-[#00b4d8] text-white' : 'bg-gray-100'
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Save Button (only visible when edited) */}
      {isEdited && (
        <button
          onClick={handleSave}
          className="w-full mt-2 bg-[#00b4d8] text-white rounded py-1 hover:bg-[#0090b8] transition"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

export default SidebarHabitWeek;
