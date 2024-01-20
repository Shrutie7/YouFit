import React from "react";
import { Routes, Route } from "react-router-dom";
import keycloak from "../keycloak/Keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import YtcloneLogin from "../authentication/YtcloneLogin";
// import Home from "./Home";
// import Head from "./Head";
// import Registeryt from "./Registeryt";

import kc from "./Keycloak.module.css"
import Home from "../pages/home/Home"
import About from "../pages/about/About"
import Contact from "../pages/contact/Contact"
import Gallery from "../pages/gallery/Gallery"
import Plans from "../pages/plans/Plan"
import Trainers from "../pages/trainers/Trainers"
import NotFound from "../pages/notFound/NotFound"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Checkout from "../pages/plans/Checkout";
import Feed from "../pages/feed/Feed";
import Setting  from "../pages/settings/Setting";

const keycloakAuth = () => {
  return (
    <div className={kc.main}>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
        // isLoadingCheck={true}
      >
      
        <Routes>
       
          <Route path="/" exact element={<YtcloneLogin />}>
         
          <Route path="home/*" exact element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route path="feedback/*" element={<Contact />} />
        <Route path="gallery/*" element={<Gallery />} />
        <Route path ="feed/*" element={<Feed/>}/>
        <Route path ="settings/*" element={<Setting/>}/>

        <Route path="plans/*" element={<Plans />} />
        <Route path = "plans/checkout" element={<Checkout />} />
        <Route path="trainers/*" element={<Trainers />} />
        <Route path="*" element={<NotFound />} />
            {/* <Route path="head/*" exact element={<Head />} /> */}
        
          </Route>
         
          {/* <Route path ="register" exact element={<Registeryt/>}/> */}
        </Routes>
        
    
      </ReactKeycloakProvider>
    </div>
  );
};

export default keycloakAuth;
