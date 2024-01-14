import Body from "./components/Body";
import Head from "./components/Head";
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak/Keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import YtcloneLogin from "./authentication/YtcloneLogin";
import Keycloakrouter from "./components/keycloakAuth";
import Fp from "./components/Fp";
import Registeryt from "./components/Registeryt";
import Hero from "./components/InitialUI/Hero";
import Programs from "./components/InitialUI/Programs";
import "./App.css";
import InitialUiRoute from "./components/InitialUiRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" exact element={<Fp />} /> */}
        {/* <Route path="/" exact element={<Keycloakrouter />} /> */}

        {/* <Route path="/" exact element={<Hero/>}/> */}

        <Route path="/" exact element={<InitialUiRoute />} />

        <Route path ="/register" exact element={<Registeryt/>}/>
        <Route path="/portal/*" exact element={<Keycloakrouter />} /> 
      </Routes>
    </div>
  );
}

export default App;

//  Head
//  Body
//   sidebar
//      -menu items
//   Maincontainer
//      -buttons list
//      -videocontainer
//        Video Card
