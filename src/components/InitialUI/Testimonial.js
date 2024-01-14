import React, { useState } from "react";
import ts from "./Testimonial.module.css";
import { testimonialsData } from "../../data/testimonialsData";
import leftarrow from "../../assets/leftArrow.png";
import rightarrow from "../../assets/rightArrow.png";

const Testimonial = () => {
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
        <span>{testimonialsData[selected].review}</span>
        <span>
          <span style={{ color: "var(--primaryclr)" }}>
            {testimonialsData[selected].name} &nbsp;
          </span>
          - {testimonialsData[selected].status}
        </span>
      </div>
      <div className={ts.right}>
        <div></div>
        <div></div>
        <img src={testimonialsData[selected].image} alt="" />

        <div className={ts.arrows}>
          <img src={leftarrow} alt="leftarrow" onClick={leftarrowhandler} />
          <img src={rightarrow} alt="rightarrow" onClick={rightarrowhandler} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
