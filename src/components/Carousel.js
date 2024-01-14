import React, { useEffect, useState } from 'react'

const Carousel = ({children:slides , autoslide = false,autoslideinterval = 5000}) => {
    const [curr,setcurr] = useState(0);
    const prev = ()=>{
        setcurr((curr)=>(curr === 0 ?slides.length-1 :curr-1))
    }
    const next = ()=>{
        setcurr((curr)=>(curr === slides.length-1 ?0 :curr+1))
    }

    useEffect(()=>{

        if(autoslide) {
        const storeinterval = setInterval(next,autoslideinterval);

        return ()=>{
            clearInterval(storeinterval);
        }
    }
    },[])
  return (
    <div className='overflow-hidden relative max-h-screen'>
        <div className='flex transition-transform ease-out duration-500' style={{transform:`translateX(-${curr*100}%)`}}>
{slides}
        </div>
        <div className='absolute bottom-8 right-0 left-0'>
        <div className='flex justify-center items-center gap-2'>
{
    slides.map((slide,i)=>(

<div className={`transition-all  w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"} `}>
</div>
    ))
}
        </div>

        </div>
    </div>
  )
}

export default Carousel