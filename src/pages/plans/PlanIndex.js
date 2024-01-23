import React from "react";
import { Routes, Route } from "react-router-dom";
import PlanOutlet from "./PlanOutlet";
import Plan from "./Plan";
import Checkout from "./Checkout";
import Plancreate from "./Plancreate";
const PlanIndex = () => {
  return (
    <>
    {/* call conditionally plancreate api on basis of role_id = 1 i.e admin user has access to create plan */}
      <Routes>
        <Route path="/" element={<PlanOutlet />}>
          <Route index element={<Plan />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path = "plancreate" element={<Plancreate/>} />
        </Route>
      </Routes>
    </>
  );
};

export default PlanIndex;
