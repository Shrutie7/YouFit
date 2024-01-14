import React from "react";
import rs from "./Reasons.module.css";
import img1 from "../../assets/image1.png";
import img2 from "../../assets/image2.png";
import img3 from "../../assets/image3.png";
import img4 from "../../assets/image4.png";
import nb from "../../assets/nb.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import tick from "../../assets/tick.png";

const Reasons = () => {
  return (
    <div className={rs.reasons} id="reasons">
      <div className={rs.leftr}>
        <img src={img1} alt="image1" />
        <img src={img2} alt="image2" />
        <img src={img3} alt="image3" />
        <img src={img4} alt="image4" />
      </div>
      <div className={rs.rightr}>
        <span>some reasons</span>

        <div>
          <span className="stroke-text">Why </span>
          <span>choose us?</span>
        </div>

        <div className={rs.detailsr}>
          <div>
            <img src={tick} alt="" />
            <span>OVER 140+ EXPERT TRAINERS</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>TRAIN SMARTER AND FASTER THAN BEFORE</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>1 FREE PROGRAM FOR NEW MEMBERS</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>RELIABLE PARTNERS</span>
          </div>

          <span
            style={{
              color: "var(--gray)",
              fontWeight: "normal",
              fontSize: "1.5rem",
            }}
          >
            OUR PARTNERS
          </span>

          <div className={rs.partners}>
            <img src={nb} alt="nb" />
            <img src={adidas} alt="adidas" />
            <img src={nike} alt="nike" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reasons;
