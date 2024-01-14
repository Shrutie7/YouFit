import React from "react";
import hr from "./Hero.module.css";
import Header from "./Header";
import heroimg from "../../assets/hero_image.png";
import heroimgback from "../../assets/hero_image_back.png";
import heart from "../../assets/heart.png";
import calories from "../../assets/calories.png";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

const Hero = () => {
  const nav = useNavigate();
  const transition = {type:'spring',duration:3}
  return (
    <div className={hr.hero}>
    <div className={`${"blur"} ${hr.blurh}`}></div>
      <div className={hr.leftH}>
        <Header />
        {/* best ad */}
        <div className={hr.bestad}>
          <motion.div
          initial={{left:'230px'}}
          whileInView={{left:'8px'}}
          transition={{...transition,type:'tween'}}
          >


          </motion.div>
          <span>The best group of fitness clubs</span>
        </div>
        {/* hero heading */}

        <div className={hr.herotext}>
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal Body</span>
          </div>
          <div>
            <span>
              At YOUFIT GYMS WE HELP YOU TO SHAPE AND BUILD YOUR IDEAL BODY AND
              LIVE UP YOUR LIFE TO THE FULLEST
            </span>
          </div>
        </div>

        <div className={hr.figures}>
          <div>
            <span>+140</span>
            <span>Expert Trainers</span>
          </div>
          <div>
            <span>+978</span>
            <span>Members Joined</span>
          </div>
          <div>
            <span>+50</span>
            <span>Fitness Programs</span>
          </div>
        </div>

        <div className={hr.herobuttons}>
          <button className={hr.btn}>Get Started</button>
          <button className={hr.btn}>Learn More</button>
        </div>
      </div>
      <div className={hr.rightH}>
      <div className={hr.btncont}>
      <button className={hr.btn} onClick={()=>nav("/register")}>Register</button>
        <button className={hr.btn} onClick={()=>nav("/portal")}>Login</button>
      </div>


        <motion.div
        initial={{right:"-1rem"}}
        transition={transition}
        whileInView={{right:"4rem"}}
         className={hr.heartrate}>
          <img src={heart} alt="heart" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div>
{/* hero images */}
        <img src={heroimg} alt="heroimg" className={hr.heroimg} />
        <img src={heroimgback} alt="heroimgback" className={hr.heroimgback} />
      
      {/* calories */}
      <div className={hr.calories}>
      <img src={calories} alt="calories" />
      <div>
      <span>Calories Burnt</span>
      <span>220 kcal</span>

      </div>
   
      </div>
      
      </div>
    </div>
  );
};

export default Hero;
