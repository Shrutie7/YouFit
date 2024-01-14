import React from "react";
import { Routes, Route } from "react-router-dom";
import keycloak from "../keycloak/Keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import YtcloneLogin from "../authentication/YtcloneLogin";
import Home from "./Home";
import Head from "./Head";
import Registeryt from "./Registeryt";

const keycloakAuth = () => {
  return (
    <div>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
        // isLoadingCheck={true}
      >
        <Routes>
          <Route path="/" exact element={<YtcloneLogin />}>
            <Route path="head/*" exact element={<Head />} />
          </Route>
          {/* <Route path ="register" exact element={<Registeryt/>}/> */}
        </Routes>
      </ReactKeycloakProvider>
    </div>
  );
};

export default keycloakAuth;
