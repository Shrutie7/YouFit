import React, { useState } from "react";
import ts from "./Testimonial.module.css";
import { testimonialsData } from "../../data/testimonialsData";
import leftarrow from "../../assets/leftArrow.png";
import rightarrow from "../../assets/rightArrow.png";
import {motion} from "framer-motion"

const Testimonial = () => {
  const transition = {type:"spring",duration:3}
  const [selected, setselected] = useState(0);
  const tlength = testimonialsData.length;

  const rightarrowhandler = () => {
    if (selected === tlength - 1) {
      setselected(0);
    } else {
      setselected(selected + 1);
    }
  };
  const leftarrowhandler = () => {
    if (selected === 0) {
      setselected(tlength - 1);
    } else {
      setselected(selected - 1);
    }
  };
  return (
    <div className={ts.testimonials}>
      <div className={ts.left}>
        <span>Testimonials</span>
        <span className="stroke-text">What they</span>
        <span>say about us</span>
        <motion.span
              key={selected}
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:100}}
        transition={transition}
        >{testimonialsData[selected].review}</motion.span>
        <span>
          <span style={{ color: "var(--primaryclr)" }}>
            {testimonialsData[selected].name} &nbsp;
          </span>
          - {testimonialsData[selected].status}
        </span>
      </div>
      <div className={ts.right}>
        <motion.div
        initial={{opacity:0,x:-100}}
        transition={{...transition,duration:2}}
        whileInView={{opacity:1,x:0}}
        ></motion.div>
        <motion.div
        initial={{opacity:0,x:100}}
        transition={{...transition,duration:2}}
        whileInView={{opacity:1,x:0}}
        ></motion.div>
        <motion.img 
        key={selected}
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:-100}}
        transition={transition}
        src={testimonialsData[selected].image} alt="" />

        <div className={ts.arrows}>
          <img src={leftarrow} alt="leftarrow" onClick={leftarrowhandler} />
          <img src={rightarrow} alt="rightarrow" onClick={rightarrowhandler} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
