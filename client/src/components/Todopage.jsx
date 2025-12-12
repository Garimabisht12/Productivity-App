import { useEffect, useState } from "react"
import React from 'react'
import AddTodo from "./AddTodo";
import axios from '../api/axios';
import DisplayTodos from "./DisplayTodos";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Todopage = () => {
  const [todos, setTodos] = useState([])
  const [newVal, setNewVal] = useState(false)
  const [changes, setChanges] = useState(false)
  const [filteredTodos, setFilteredTodo] = useState(todos)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = ["All", "Active", "Completed"];

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.is_completed).length,
    active: todos.filter(t => !t.is_completed).length
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        const res = await axios.get("todos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(res.data);
        setFilteredTodo(res.data);
      } catch (err) {
        console.error("Failed to fetch todos:", err.response?.data || err.message);
      } finally {
        setLoading(false)
      }
    };

    fetchTodos();
  }, [changes]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((t) => t._id === active.id);
      const newIndex = todos.findIndex((t) => t._id === over.id);

      const newOrder = arrayMove(todos, oldIndex, newIndex);
      setTodos(newOrder);

      try {
        await axios.post(
          'todos/reorder',
          { todos: newOrder.map((t) => t._id) },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChanges((prev) => !prev);
      } catch (err) {
        console.error("Failed to update order:", err);
      }
    }
  };

  const todoFilter = (val) => {
    if (val === 'Completed') {
      setFilteredTodo(todos.filter(todo => todo.is_completed));
    } else if (val === 'Active') {
      setFilteredTodo(todos.filter(todo => !todo.is_completed));
    } else {
      setFilteredTodo(todos);
    }
  }
  const handleBack = () => {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-6 px-4 sm:px-6 lg:px-8">
      {/* <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="fixed top-24 left-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 active:translate-y-0 z-50"
          >
            ← Back
          </button>
        </div> */}
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">My Tasks</h1>
          <p className="text-[var(--text-secondary)]">Organize and track your daily tasks efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-[var(--button-bg)]">{stats.total}</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">Total Tasks</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-[var(--text-secondary)]">{stats.active}</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">Active</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-[var(--button-hover)]">{stats.completed}</div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">Completed</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-sm overflow-hidden">
          {/* Action Bar */}
          <div className="border-b border-[var(--border-color)] p-4 sm:p-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex-1 w-full">
              {newVal ? (
                <AddTodo todos={todos} setTodos={setTodos} setChanges={setChanges} setNewVal={setNewVal} />
              ) : (
                <button
                  onClick={() => setNewVal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded-lg transition-colors font-medium"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">Add New Task</span>
                  <span className="sm:hidden">Add Task</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="border-b border-[var(--border-color)] p-4 sm:p-6">
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              {buttons.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => {
                    todoFilter(btn);
                    setActiveIndex(index);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base
                    ${activeIndex === index
                      ? "bg-[var(--button-bg)] text-[var(--text-primary)] shadow-sm"
                      : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                    }
                  `}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="animate-spin text-[var(--button-bg)]" size={32} />
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">
                  {activeIndex === 0 ? "No tasks yet. Create one to get started!" : activeIndex === 1 ? "All tasks completed!" : "No completed tasks yet."}
                </p>
              </div>
            ) : (
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={filteredTodos.map((t) => t._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 sm:space-y-3">
                    {filteredTodos.map((todo) => (
                      <DisplayTodos key={todo._id} todo={todo} setChanges={setChanges} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mt-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[var(--text-secondary)] font-medium">Progress</p>
              <p className="text-sm text-[var(--text-secondary)]">{stats.completed} of {stats.total} completed</p>
            </div>
            <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[var(--button-bg)] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Todopage