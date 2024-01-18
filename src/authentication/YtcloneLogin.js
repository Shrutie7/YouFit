import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import keyclock from "../keycloak/Keycloak";
import {useDispatch, useSelector} from "react-redux";
import Home from "../components/Home";
import { keycloakSessionreducer } from "../store/KeycloakSession";
import { addLoginReducer } from "../store/LoginDetails";
import axiosInstance from "../services/LocalAxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
// import Head from "../components/Head";

const YtcloneLogin = () => {
//     let keyclcksession = useSelector((e) =>
//     e.keycloakSession?.data?.sessionId ? e.keycloakSession.data.sessionId : ""
//   );
  const { keycloak, initialized } = useKeycloak();
  const loc = useLocation();
  const nav = useNavigate();
  let keyclcksession = useSelector((e) =>
  e.keycloakSession?.data?.sessionId ? e.keycloakSession.data.sessionId : ""
);

const dispatch = useDispatch();
  console.log(keycloak?.idTokenParsed?.email)

  const [tokenavailability, settokenavailability] = useState(false);

const logindetailsurl = "users/getuser";

//   if (!initialized) {
//     return <div>Loading...</div>;
//   }
//   {keycloak.authenticated?<YtcloneLogin/>:<></>}

const logindetailsapi = async (logindetailsurl,emailId,navpath) => {
  // setloaded(true)
  const res = await axiosInstance.post(logindetailsurl, {
    emailId: emailId
  });

  try {
    if (res.status === 200) {
      if (res.data.status) {
        let l = res.data.data;

        console.log(l)
        dispatch(keycloakSessionreducer({ sessionId: keycloak.sessionId }));
        dispatch(addLoginReducer({ ...res.data.data }));
        nav(navpath);
      } else {
   
        // const l = { ...err };
        // // setloaded(false)
        // setshow(true);
        // setnavpath("/");
        // setmodalType("errormodal");
        // l.message = res.data.message;
        // seterrcode(l.message);
        // setlogout(true);
      
      }
    } else if (res?.response.status === 401) {
      // seterrcode(Errmsg["err002"]);

      // setshow(true);
      // setlogout(true);
      // setnavpath("/");

      // setmodalType("errormodal");
    } else {
      // seterrcode(Errmsg["err001"]);
      // setlogout(true);
      // setshow(true);
      // setmodalType("errormodal");
    }
  } catch (err) {
  
    // seterrcode(Errmsg["err001"]);
    // setlogout(true);
    // setshow(true);
    // setmodalType("errormodal");
  }
};


const data = async () => {
    const getdata = () => new Promise((resolve) => resolve(keycloak.token));
    const res = await getdata();

    if (res) {
      settokenavailability(true);
    }
    console.log(res)
   
    if (
      (keycloak.authenticated && loc.pathname === "/") ||
      (keycloak.authenticated && keyclcksession !== keycloak.sessionId) ||
      (keycloak.authenticated && keyclcksession === "")
    ) {
      logindetailsapi(
        logindetailsurl,
        keycloak?.idTokenParsed?.email,
      "home"
      );

    } else if (keycloak?.authenticated) {
      logindetailsapi(
        logindetailsurl,
        keycloak?.idTokenParsed?.email,
        loc.pathname
      
      );
    }

      // let permissionvaluesarr = loginjson.permissionsList.map((d) => {
      //   return d.permissions.map((d1) => d1.permissionId);
      // });
      // permissionvaluesarr = permissionvaluesarr.flat(Infinity);
      // dispatch(addpermissionvalues({ values: [...permissionvaluesarr] }));
      // nav(loc.pathname)
      // setloaded(true);
    // }
  };

  useEffect(() => {
    data();
  }, [keycloak.authenticated]);

  return (
    <>

{
    /* tokenavailability  ? <Head></Head> :<></> */
        tokenavailability  ? <Home></Home> :<></>
}
{/* 
      <input
        type="text"
        placeholder="Username"
        value={userDetails.username}
        onChange={(event) => setuserDetails(event.target.value)}
      />
        <input
        type="email"
        placeholder="Email"
        value={userDetails.emailId}
        onChange={(event) => setuserDetails(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={userDetails.password}
        onChange={(event) => setuserDetails(event.target.value)}
      />
      <button type="submit" onClick={()=>{handleSubmit()}}>Log in</button> */}
    </>
  );
};

export default YtcloneLogin;
