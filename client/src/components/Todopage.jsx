import {useEffect, useState } from "react"
import React from 'react'
import AddTodo from "./AddTodo";
import axios from '../api/axios';
const Todopage = () => {
  const [todos, setTodos] = useState([])
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchTodos = async () => {
      try {
        const res = await axios.get("todos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos:", err.response?.data || err.message);
      }
    };

    fetchTodos();
}, [todos]);
  
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('')


  //*******  to delete tasks ******

  const delete_task = async(id) => {
  try{
        const res = await axios.delete(`todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

  }catch(e){
    console.log(e)
  }
  }

  // ***** edit tasks ******
  const startEdit = (todo) => {

    setEditingId(todo.id)
    setEditText(todo.title)

  }

  const saveEdit = async(todo) => {
   try{
const id = todo._id
      const res = await axios.put(`/todos/${id}`, {title: editText, is_completed: todo.is_completed, deadline: todo.deadline},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    } catch(e){

    }
    setEditingId(null)
    setEditText('')
  }


  // **** toggle checkbox ****
  const toggleComplete = async (todo) => {
    try{
      const res = await axios.put(`/todos/${todo._id}`, {title: todo.title, is_completed: !todo.is_completed, deadline:todo.deadline}, {headers:
        {Authorization: `Bearer ${token}`}
      })
    }
    catch(e){
console.log(e)
    }
  };

  return (
    <>
      <div className="todos flex flex-col items-center justify-center h-[80vh]">
        <div className="card w-[30vw]  py-8 bg-[#EDEDED]">
          <div className="card-content my-4 justify-self-center">
            <h1 className='text-3xl font-bold mb-4'>To-Do List</h1>

            <AddTodo todos={todos} setTodos={setTodos} />

            {
              todos.map((todo) => {
                return (
                  <li className='list-none my-1 ' key={todo.id}>
                    <div className="todo flex justify-between " >
                      {editingId === todo.id ? (
                        <div className="edit_list">
                          <input type='text' name="" id="" value={editText} onChange={(e) => setEditText(e.target.value)} />
                          <button className='ml-5' onClick={() => saveEdit(todo)}>Save</button>
                          <button className='ml-5' onClick={() => setEditingId(null)}>cancel</button>
                        </div>
                      ) : (
                        <>
                          <div className=''>
                            <input type="checkbox" checked={todo.is_completed} onChange={() => toggleComplete(todo)} name="" id="" />{todo.title}
                            <div className="deadline text-xs ">
                              <p>{todo.deadline}</p>
                            </div>
                          </div>
                          <div className="del ml-4 ">
                            <button className='ml-3' onClick={() => delete_task(todo._id)} >Delete</button>
                            <button className='ml-3' onClick={() => startEdit(todo)}>Edit</button>
                          </div>
                        </>
                      )
                      }
                    </div>

                  </li>

                )
              }
              )
            }
          </div>
        </div>
      </div>

    </>
  )
}


export default Todopage