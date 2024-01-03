import React, { useEffect } from "react";
// import { useKeycloak } from "@react-keycloak/web";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  // const { keycloak, initialized } = useKeycloak();
  const nav = useNavigate();
  // const handlelogout=() => {
  //   keycloak.logout({ redirectUri: `${window.location.origin}/` });

  // }
  useEffect(() => {
    nav("/portal/head");
  }, []);
  return (
    <div className="flex">
      {/* <div>Home</div> */}

      {/* <button className="border border-black bg-slate-500" onClick={()=>handlelogout()}>Logout</button> */}

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
