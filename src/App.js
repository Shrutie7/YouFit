import Body from "./components/Body";
import Head from "./components/Head";
import { Routes, Route } from "react-router-dom";

import { useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak/Keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import YtcloneLogin from "./authentication/YtcloneLogin";
import Keycloakrouter from "./components/keycloakAuth";
import Fp from "./components/Fp";
function App() {
  console.log(keycloak);
  return (
   <div>
     <Routes>
      <Route path="/" exact element={<Fp />} />
      <Route path="/portal/*" exact element={<Keycloakrouter />} />
      {/* <Route path="/portal/APM/*" exact element={<APMRouter/>} /> */}
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
