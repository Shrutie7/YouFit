import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassesOutlet from "./ClassesOutlet";
import Classes from "./Classes";
import CreateClass from "./CreateClass";
import EditClass from "./EditClass";
import ClassesBook from "./ClassesBook";
const PlanIndex = () => {
  return (
    <>
    {/* call conditionally plancreate api on basis of role_id = 1 i.e admin user has access to create plan */}
      <Routes>
        <Route path="/" element={<ClassesOutlet />}>
          <Route index element={<Classes />} />
          <Route path="classcreate" element={<CreateClass />} />
          <Route path = "editClass" element={<EditClass/>} />
          <Route path = "classesbook" element={<ClassesBook />} />
        </Route>
      </Routes>
    </>
  );
};

export default PlanIndex;
