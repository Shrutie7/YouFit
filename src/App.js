import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Keycloakrouter from "./components/keycloakAuth";
import Registeryt from "./components/Registeryt";
import "./App.css";
import InitialUiRoute from "./components/InitialUiRoute";

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/" exact element={<InitialUiRoute />} />
          <Route path="/register" exact element={<Registeryt />} />
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