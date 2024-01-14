import React from "react";
import Hero from "./InitialUI/Hero";
import Programs from "./InitialUI/Programs";
import Reasons from "./InitialUI/Reasons";
import Plan from "./InitialUI/Plan";
import Testimonial from "./InitialUI/Testimonial";
import Join from "./InitialUI/Join";
import Footer from "./InitialUI/Footer";

const InitialUiRoute = () => {
  return (
    <div className="p-4">
      <Hero />
      <Programs />
      <Reasons/>
      <Plan/>
      <Testimonial/>
      <Join/>
      <Footer/>
    </div>
  );
};

export default InitialUiRoute;
