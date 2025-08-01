import React from 'react'
import pic from '../assets/react.svg'
import cat from '../assets/cat.avif'

import '../app.css'
import Buttons from './Buttons'
const Hero = () => {
  return (
    <div className='hero flex justify-around h-screen'>
      {/* left  */}
      <div className="left content-center">

        <h1 className='text-[#333333] text-7xl'>
          Bring clarity to your day.
        </h1>
        <h2 className='text-[#666666] text-xl my-4 text-right' >Organize, focus, and move forward — all in one clean space.

        </h2>
        <div className="justify-self-end">

        <Buttons  label={'Get Started'}  />
        </div>


      </div>
      <div className="right content-center">

        <img src='https://plus.unsplash.com/premium_vector-1719609638996-20981200cd3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHlpbmclMjBibGFjayUyMGNhdCUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D' className='w-[360px] h-[400px]' alt="" />
      </div>
    </div>

  )
}

export default Hero