import React, {useEffect, useState} from 'react'
import { useAppContext } from '../contexts/AppContext'
import axios from '../api/axios'
import AddExpenses from './AddExpenses'

const DisplayExpense = ({expense, setExpense}) => {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editValue, setEditValue] = useState('')
  const [newVal, setNewVal] = useState(false)
  const {totalE, newEx, setNewEx} = useAppContext()
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchFinance = async () => {
      try {
        // const res = await axios.get("finance/expense", {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        // setExpense(res.data);
      } catch (err) {
        console.error("Failed to fetch expense:", err.response?.data || err.message);
      }
    };

    fetchFinance();
  }, [newEx]);

  // **** Delete Entry **** //
  const deleteEntry = async(item) =>{

    try{
      const res = await axios.delete(`/finance/expense/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setNewEx(prev => !prev)
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
    setNewEx(prev => !prev)
  }

  const saveEdit = async(item) =>{
    try{

      const res = await axios.put(`finance/expense/${item._id}`,{title: editText, value: editValue}, {headers:{
        Authorization: `Bearer ${token}`
      }})
      setNewEx(prev => !prev)
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
    <div className="content flex justify-center mb-30 flex-1 ">
    <div className="mt-10 p-4 sm:p-10 flex-1">
      <h2 className="header text-center mb-6 border-b-2 border-[var(--border-color)] font-semibold text-[var(--text-primary)]">Expenses</h2>
      
        {
          expense.map((item) =>{
            return(
              <li className='list-none border-b-[0.09em] border-dashed border-[var(--border-color)] pt-1.5' key={item._id}>
                <div className="list_e">
                  { 
                    editingId === item._id ? (
                    <div className="editList flex flex-col sm:flex-row gap-2 p-3 bg-[var(--bg-tertiary)] rounded">
                      

                    <input type='text' className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-2 py-1' value={editText} onChange={(e) => setEditText(e.target.value)}/> 
                    <input type="number" className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-2 py-1' name="" id="" value={editValue} onChange={(e) =>  setEditValue(+e.target.value)}/>
                    <button onClick={() => saveEdit(item)} className='px-4 py-1 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded transition'>Save</button>
                    <button onClick={() => setEditingId(null)} className='px-4 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] rounded transition'>Cancel</button>
                      </div>
                    
                  ):(
                    <div className="lists flex flex-col sm:flex-row gap-2 items-center">

                      <input type="text" className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-2 py-1' value={item.title} disabled/>
                      <input type="text" className='flex-1 bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-2 py-1' value={item.value} disabled />
               
                <button className='px-4 py-1 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded transition' onClick={() => startEdit(item)}>Edit</button>
                <button className='px-4 py-1 bg-[var(--button-bg)] text-[var(--text-primary)] hover:bg-[var(--button-hover)] rounded transition' onClick={() => deleteEntry(item)}>Remove</button>
                    </div>
                  )

                  }

                </div>

              </li>
            )
          })
        }
        <li className='list-none mt-2'>
           {    
           
                  newVal && <AddExpenses setNewVal={setNewVal}/>
                }
                
                {

                  !newVal && <button onClick={() => setNewVal(prev => !prev)} className='font-bold text-2xl text-[var(--button-bg)] hover:text-[var(--button-hover)]'>+</button>
                }
                </li>
        <div className="totalExpense mt-4 flex justify-between border-b-2 border-[var(--border-color)] pt-3 text-[var(--text-primary)] font-semibold">
          <span>Total </span>
          <span>₹{totalE}</span>
        </div>
        </div>
        </div>
    </>
  )
}

export default DisplayExpense