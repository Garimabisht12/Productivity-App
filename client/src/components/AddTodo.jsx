import React, { useState, useRef } from 'react'
import axios from '../api/axios'
import { Plus, X, Calendar } from 'lucide-react'

const AddTodo = ({ todos, setTodos, setChanges, setNewVal }) => {
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('')
  const [displayDeadline, setDisplayDeadline] = useState('')
  const [loading, setLoading] = useState(false)
  const dateInputRef = useRef(null)
  const token = localStorage.getItem("token");

  // Format date from YYYY-MM-DD to readable format
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get today's date in YYYY-MM-DD
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = getTodayDate();

    if (!selectedDate) {
      setDeadline('');
      setDisplayDeadline('');
      return;
    }

    // Only accept today or future dates
    if (selectedDate >= today) {
      setDeadline(selectedDate);
      setDisplayDeadline(formatDateDisplay(selectedDate));
    }
  };

  const handleDateInputClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click();
    }
  };

  const clearDeadline = () => {
    setDeadline('');
    setDisplayDeadline('');
    if (dateInputRef.current) {
      dateInputRef.current.value = '';
    }
  };

  const add_todo = async () => {
    if (newTask.trim() === '') return;
    try {
      setLoading(true)
      const res = await axios.post('todos', { title: newTask, is_completed: false, deadline }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(token)
      console.log(res.data)
      
      setTodos([...todos, res.data]);
      setNewTask('')
      setDeadline('')
      setDisplayDeadline('')
      setNewVal(prev => !prev)
      setChanges((prev) => !prev)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      add_todo();
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent placeholder-[var(--text-tertiary)]'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='What do you need to do?'
          disabled={loading}
        />
        
        <div className="flex-1 relative">
          <div className="relative flex items-center">
            <Calendar size={18} className="absolute left-3 text-[var(--text-secondary)] pointer-events-none" />
            <input
              ref={dateInputRef}
              type="date"
              value={deadline}
              onChange={handleDateChange}
              min={getTodayDate()}
              disabled={loading}
              className='w-full bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg pl-10 pr-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[var(--button-bg)] focus:border-[var(--button-bg)] hover:border-[var(--button-bg)] transition-colors disabled:opacity-50 cursor-pointer'
              placeholder='Pick a date'
            />
          </div>

          {deadline && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearDeadline();
              }}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1'
              title='Clear date'
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          className='flex items-center justify-center gap-2 px-6 py-2 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={add_todo}
          disabled={loading || !newTask.trim()}
        >
          <Plus size={18} />
          Add
        </button>
        <button
          className='flex items-center justify-center gap-2 px-6 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-lg transition-colors font-medium text-sm'
          onClick={() => {
            setNewVal(prev => !prev);
            setDeadline('');
            setDisplayDeadline('');
          }}
          disabled={loading}
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddTodo;