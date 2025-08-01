import React from 'react'

  const sizeClasses = {
  sm: 'px-4 py-1 text-sm',
  md: 'px-6 py-1.5 text-base',
  lg: 'px-10 py-1.5 text-lg',
};

const Buttons = ({size = 'md', className='', label}) => {

const sizeClass = sizeClasses[size] ;

  
  return (
    <>
    <button type='submit' className={`bg-black text-white rounded-full ${sizeClass} ${className}`} >{label}</button>

    </>

  )
}

export default Buttons