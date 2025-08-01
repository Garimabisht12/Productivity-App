import React, {useEffect, useState} from 'react'
import { useAppContext } from '../contexts/AppContext'
import axios from '../api/axios'

const DisplayExpense = () => {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editValue, setEditValue] = useState('')
  const {expense, setExpense, totalE} = useAppContext()
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await axios.get("finance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpense(res.data);
      } catch (err) {
        console.error("Failed to fetch expense:", err.response?.data || err.message);
      }
    };

    fetchFinance();
  }, [expense]);

  // **** Delete Entry **** //
  const deleteEntry = async(item) =>{

    try{
      const res = await axios.delete(`/finance/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch(e) {
console.log(e)
    }
  }

  // **** Edit Entry **** //
  const startEdit = (item) =>{
    console.log('edited')
    setEditingId(item._id)
    setEditText(item.title)
    setEditValue(item.value)
  }

  const saveEdit = async(item) =>{
    try{

      const res = await axios.put(`finance/${item._id}`,{title: editText, value: editValue}, {headers:{
        Authorization: `Bearer ${token}`
      }})
    }
    catch(e){
      console.log(e)
    }
    setEditingId(null)
    setEditValue(null)
    setEditText('')
  }


  return (
    <>
    <div className="content flex justify-center mr-40 ">
    <div className=" justify-items-center expense_list mt-10 border-5 p-10 ">
      <div className="header">Expenses</div>
      
        {
          expense.map((item) =>{
            return(
              <li className='list-none' key={item.id}>
                <div className="list_e">
                  { 
                    editingId === item._id ? (
                    <div className="editList">
                      

                    <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}/> 
                    <input type="number" name="" id="" value={editValue} onChange={(e) =>  setEditValue(+e.target.value)}/>
                    <button onClick={() => saveEdit(item)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    
                  ):
                  (
                    <div className="lists">
                      <span className='mr-5'>{item.title}</span>
                <span className='mr-5'>{item.value}</span>
                
                <button className='mr-5' onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => deleteEntry(item)}>Remove</button>
                    </div>
                  )

                  }

                </div>

              </li>
            )
          })
        }
        <div className="totalExpense">
          <span>Total: {totalE}</span>
        </div>
        </div>
        </div>
    </>
  )
}

export default DisplayExpense