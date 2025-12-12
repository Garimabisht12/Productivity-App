import React from 'react'
import pic from '../assets/react.svg'
import cat from '../assets/cat.avif'

import '../app.css'
import Buttons from './Buttons'
const Hero = () => {
  return (
    <div className='hero flex flex-col md:flex-row justify-around items-center min-h-screen gap-6 bg-[var(--bg-primary)] p-4 sm:p-8'>
      {/* left  */}
      <div className="left flex flex-col justify-center items-center md:items-start text-center md:text-left">

        <h1 className='text-[var(--text-primary)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
          Bring clarity to your day.
        </h1>
        <h2 className='text-[var(--text-secondary)] text-lg md:text-xl my-4' >Organize, focus, and move forward — all in one clean space.

        </h2>
        <div className="justify-self-end">

        <Buttons  label={'Get Started'}  />
        </div>


      </div>
      <div className="right flex justify-center items-center">

        <img src='https://plus.unsplash.com/premium_vector-1719609638996-20981200cd3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHlpbmclMjBibGFjayUyMGNhdCUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D' className='w-[280px] h-[320px] sm:w-[360px] sm:h-[400px] rounded-lg' alt="Productive workspace" />
      </div>
    </div>

  )
}

export default Hero