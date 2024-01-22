import React, { useEffect } from "react";
// import { useKeycloak } from "@react-keycloak/web";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import Head from "./Head";

const Home = () => {
  // const { keycloak, initialized } = useKeycloak();
  const nav = useNavigate();
  // const handlelogout=() => {
  //   keycloak.logout({ redirectUri: `${window.location.origin}/` });

  // }
  // useEffect(() => {
  //   nav("/portal/home");
  // }, []);
  return (
    <div className="">
      {/* <div>Home</div> */}
      {/* <Head/> */}

      {/* <button className="border border-black bg-slate-500" onClick={()=>handlelogout()}>Logout</button> */}
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
