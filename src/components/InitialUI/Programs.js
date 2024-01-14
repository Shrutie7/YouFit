import React from 'react'
import pr from "./Programs.module.css"
import {programsData} from "../../data/programsData"
import rightarrow from "../../assets/rightArrow.png"

const Programs = () => {
  return (
    <div className={pr.program} id="programs">
        <div className={pr.programsheader}>
            <span className='stroke-text'>Explore our</span>
            <span>Programs</span>
            <span className='stroke-text'>to shape your</span>
        </div>
        <div className={pr.programcategory}>
{
    programsData.map((p)=>(
        <div className={pr.category}>
        {p.image}
        <span>{p.heading}</span>
        <span>{p.details}</span>

        <div className={pr.joinnow}>
        <span>Join now</span>
        <img src={rightarrow} alt="arrow"/>
        </div>
        </div>
    ))
}
        </div>
    </div>
  )
}

export default Programs