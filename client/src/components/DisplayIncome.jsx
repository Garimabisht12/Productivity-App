import React, { use, useState } from 'react'

const DisplayIncome = () => {
    const [income, setIncome] = useState([{title:'salary', value:30000, id: self.crypto.randomUUID()}, {title:'salary', value:30000, id: self.crypto.randomUUID()}, {title:'salary', value:30000, id: self.crypto.randomUUID()}])
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')
    const [editValue, setEditValue] = useState('')
    
    
      // **** Delete Entry **** //
      const deleteEntry = (id) =>{
        const entry = income.filter(item => item._id !== id)
        setIncome([...entry])
        console.log('deleted')
      }
    
      // **** Edit Entry **** //
      const startEdit = (item) =>{
        console.log('edited')
        setEditingId(item._id)
        setEditText(item.title)
        setEditValue(item.value)
      }
    
      const saveEdit = (id) =>{
        setIncome(income.map(item => item._id === id ? {...item, title: editText, value: editValue}: item, ));
    
        setEditingId(null)
        setEditValue(null)
        setEditText('')
      }
    
    

  return (
    <>
    <div className="content flex justify-center ">
    <div className=" justify-items-center expense_list mt-10 border-5 p-10 ">

    <div className="lists">
        <h2>Income</h2>
        {
            income.map((item) =>{
                return(
                <li className='list-none' key={item._id}>
                <div className="list_e">
                  { 
                    editingId === item._id ? (
                    <div className="editList">
                      

                    <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}/> 
                    <input type="number" name="" id="" value={editValue} onChange={(e) =>  setEditValue(+e.target.value)}/>
                    <button onClick={() => saveEdit(item._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    
                  ):
                  (
                    <div className="lists">
                      <span className='mr-5'>{item.title}</span>
                <span className='mr-5'>{item.value}</span>
                
                <button className='mr-5' onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => deleteEntry(item._id)}>Remove</button>
                    </div>
                  )

                  }

                </div>

              </li>
                )
            })
        }
    </div>
    </div>
    </div>
    
    </>
  )
}

export default DisplayIncome