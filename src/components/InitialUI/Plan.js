import React from "react";
import pl from "./Plan.module.css";
import { plansData } from "../../data/plansData";
import whitetick from "../../assets/whiteTick.png";
const Plan = () => {
  return (
    <div className={pl.plancontainer}>
    <div className={`${"blur"} ${pl.plansblur1}`}></div>
    <div className={`${"blur"} ${pl.plansblur2}`}></div>
      <div className={pl.programsheader} style={{ gap: "2rem" }}>
        <span className="stroke-text">READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="stroke-text">NOW WITH US</span>
      </div>

      {/* plans card */}
      <div className={pl.plans}>
        {plansData.map((plan, i) => (
          <div className={pl.plan} key={i}>
          {plan.icon} 
            <span>{plan.name}</span>
            <span>$ {plan.price}</span>

            <div className={pl.features}>
              {plan.features.map((feature, i) => (
                <div className={pl.feature}>
                  <img src={whitetick} alt="whitetick" />
                  <span key={i}>{feature}</span>
                </div>
              ))}
            </div>
            <div>
              <span>See more benefits -></span>
            </div>
            <button className="btn">Join Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
