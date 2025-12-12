import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Edit2, Check, X } from "lucide-react";

const DisplayTodos = ({ todo, setChanges }) => {
  const [editDeadline, setEditDeadline] = useState('')
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('')
  const token = localStorage.getItem("token");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo._id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  const delete_task = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChanges((prev) => !prev)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo._id)
    setEditText(todo.title)
    setEditDeadline(todo.deadline)
  }

  const saveEdit = async (todo) => {
    if (!editText.trim()) return;
    try {
      const id = todo._id
      await axios.put(`/todos/${id}`, { title: editText, is_completed: todo.is_completed, deadline: editDeadline }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChanges((prev) => !prev)
    } catch (e) {
      console.log(e)
    }
    setEditingId(null)
    setEditText('')
    setEditDeadline('')
  }

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`/todos/${todo._id}`, { title: todo.title, is_completed: !todo.is_completed, deadline: todo.deadline }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setChanges((prev) => !prev)
    }
    catch (e) {
      console.log(e)
    }
  };

  if (editingId === todo._id) {
    return (
      <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type='text'
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent'
              placeholder="Task description"
            />
            <input
              type='date'
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[var(--button-bg)] focus:border-transparent'
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className='flex items-center gap-2 px-4 py-2 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded-lg transition-colors font-medium text-sm'
              onClick={() => saveEdit(todo)}
            >
              <Check size={16} />
              Save
            </button>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded-lg transition-colors font-medium text-sm'
              onClick={() => setEditingId(null)}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-4 sm:p-5 hover:shadow-md transition-all group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Drag Handle & Checkbox */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            {...attributes}
            {...listeners}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-grab active:cursor-grabbing transition-colors"
            title="Drag to reorder"
          >
            <GripVertical size={20} />
          </button>
          <input
            type="checkbox"
            checked={todo.is_completed}
            onChange={() => toggleComplete(todo)}
            className='w-5 h-5 cursor-pointer accent-[var(--button-bg)] rounded transition-colors'
            title="Mark as complete"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm sm:text-base font-medium break-words ${
            todo.is_completed ? 'line-through text-[var(--text-tertiary)]' : 'text-[var(--text-primary)]'
          }`}>
            {todo.title}
          </p>
          {todo.deadline && (
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              📅 {new Date(todo.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-auto sm:ml-0">
          <button
            className='flex items-center gap-2 px-3 py-2 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded-lg transition-colors font-medium text-sm'
            onClick={() => startEdit(todo)}
            title="Edit task"
          >
            <Edit2 size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            className='flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors font-medium text-sm'
            onClick={() => delete_task(todo._id)}
            title="Delete task"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisplayTodos;