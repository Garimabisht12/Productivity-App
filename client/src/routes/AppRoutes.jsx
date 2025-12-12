import Dashboard from "../pages/Dashboard";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../pages/Login";
import Todos from "../pages/Todos";
import Habit from "../pages/Habit";
import Navbar from "../components/Navbar";
import Todopage from "../components/Todopage";
import Finance from "../pages/Finance";
import NotFound from "../pages/NotFound";
import SignUp from "../components/SignUp";
import HabitTracker from "../components/HabitTracker";


export default function AppRouter(){
    return(
        
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/habit' element={<Habit />} />
            {/* <Route path="/habit/:id" element={<HabitTracker />} /> */}
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/dashboard' element={
                <UserRoute>
                    <Dashboard />
                </UserRoute>
            } /> */}

            

                <Route path='dashboard' element={<Dashboard />} />
                <Route path='todos' element={<Todos />} />
                <Route path='finance' element={<Finance />} />
            <Route path="*" element={<NotFound />} />
                
        </Routes>
    )
}