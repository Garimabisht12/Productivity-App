import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {useNavigate} from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(0)
    const navigate = useNavigate()

    const gotoes = (e) => {
        const la = e.target.value;
        console.log(la)
        navigate(`/${la}`, {replace:true})
    }

    return (
        <>

         
                {/* <div className="chaveron absolute top-22 left-37.5 ">
                <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className=" cursor-pointer p-2 hover:bg-gray-200 rounded-full transition">
  {isSidebarOpen ? <ChevronLeft size={40} /> : <ChevronRight size={40} />}
</div></div> */}
            <div className="sidebar bg-[#EDEDED] flex h-screen">


                <div className="lists mx-9">
                    <h2 className='text-xl font-bold my-4 text-[#212529] '>Meoww</h2>

                    <div className="links text-sm text-[#212529]  ">

                         <p><button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'dashboard'} onClick={gotoes}>Dashboard </button> 
                         </p><p><button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'todos'} onClick={gotoes}>Todos </button> 
                         </p><p><button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'finance'} onClick={gotoes}>Finances </button> 
                         </p><p><button className='hover:bg-gray-300  py-1 px-4 rounded-lg' value={'habit'} onClick={gotoes}>Habits </button> 
                         </p><p><button className='hover:bg-gray-300  py-1 px-4 rounded-lg' onClick={()=> console.log(1)}>Settings </button> 
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar