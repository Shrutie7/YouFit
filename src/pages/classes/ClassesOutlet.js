import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const PlanOutlet = () => {

    const loc1 = useLocation();
    const nav = useNavigate();
    useEffect(()=>{
        if(loc1.pathname==="/portal")
        {
            nav("/portal/home")
        }
        },[loc1.pathname])
  return (
    <div className='h-[100%]'>
        <Outlet/>
    </div>
  )
}

export default PlanOutlet