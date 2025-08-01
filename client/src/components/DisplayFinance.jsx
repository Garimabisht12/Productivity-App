import React, { useState } from 'react'
import DisplayIncome from './DisplayIncome'
import DisplayExpense from './DisplayExpense'
import { useAppContext } from '../contexts/AppContext';

const DisplayFinance = () => {
  
  return (

    <>
    <div className='flex  '>Display Finance

      <DisplayExpense />
      <DisplayIncome />

    </div>

      
    </>
  )
}

export default DisplayFinance