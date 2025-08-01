import React, { useState} from 'react'
import axios from '../api/axios'

const AddTodo = ({todos, setTodos}) => {

    const [newTask, setNewTask] = useState('');
    const [deadline, setDeadline] = useState('')
    const token = localStorage.getItem("token");
    
    

    const add_todo = async () => {
    if (newTask.trim() === '') return;
        try{
            const res =await axios.post('todos', {title: newTask, is_completed: false, deadline}, {headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }});
setTodos([...todos, res.data]);
    setNewTask('') 
        } catch(e){
console.log(e)
        }
    
    

  }
  return (
    <>
    <div className="add_new_task my-4">
              <input type="text" name="" id="" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='New Task' />
              <input type="text" name="" id="" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder='deadline' />
              <button className='ml-2' onClick={add_todo}>Add</button>
            </div>
    </>
  )
}

export default AddTodo