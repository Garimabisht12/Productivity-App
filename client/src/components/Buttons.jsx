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
    <button type='submit' className={`bg-[var(--button-bg)] text-[var(--text-primary)] rounded-full hover:bg-[var(--button-hover)] transition duration-200 ${sizeClass} ${className}`} >{label}</button>

    </>

  )
}

export default Buttons