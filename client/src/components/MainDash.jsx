import React from 'react'
import Todopage from './Todopage'
import VisualFinance from './VisualFinance'
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Todos",
    emoji: "📝",
    path: "/todos",
    description: "Manage your tasks efficiently.",
  },
  {
    title: "Habits",
    emoji: "🔥",
    path: "/habit",
    description: "Track and build good habits.",
  },
  {
    title: "Finances",
    emoji: "💰",
    path: "/finance",
    description: "Monitor your income and expenses.",
  },
];


  






const MainDash = () => {

const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => navigate(feature.path)}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col items-center"
          >
            <div className="text-4xl mb-4">{feature.emoji}</div>
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="text-gray-500 text-center mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainDash