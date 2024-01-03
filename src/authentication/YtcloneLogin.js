import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import keyclock from "../keycloak/Keycloak";
import {useSelector} from "react-redux";
import Home from "../components/Home"
import Head from "../components/Head";

const YtcloneLogin = () => {
//     let keyclcksession = useSelector((e) =>
//     e.keycloakSession?.data?.sessionId ? e.keycloakSession.data.sessionId : ""
//   );
  const { keycloak, initialized } = useKeycloak();
  let userjson ={
    username:"",
    emailId:"",
    password:""
  }
  const [userDetails,setuserDetails] = useState({...userjson})
  const [tokenavailability, settokenavailability] = useState(false);

  
//   const handleSubmit = async (event) => {
//     try {
//       await keycloak.login({...userDetails.emailId,...userDetails.password});
//     } catch (error) {
//       console.error("Failed to log in", error);
//     }
//   };

//   if (!initialized) {
//     return <div>Loading...</div>;
//   }
//   {keycloak.authenticated?<YtcloneLogin/>:<></>}


const data = async () => {
    const getdata = () => new Promise((resolve) => resolve(keycloak.token));
    const res = await getdata();

    if (res) {
      settokenavailability(true);
    }
    console.log(res)
    // if(keyclcksession===keycloak.sessionId || ){
    // if (
    //   (keycloak.authenticated && loc.pathname === "/") ||
    //   (keycloak.authenticated && keyclcksession !== keycloak.sessionId) ||
    //   (keycloak.authenticated && keyclcksession === "")
    // ) {
    //   logindetailsapi(
    //     logindetailsurl,
    //     keycloak?.idTokenParsed?.preferred_username.toUpperCase(),
    //     "dashboard"
    //   );

    // } else if (keycloak?.authenticated) {
    //   logindetailsapi(
    //     logindetailsurl,
    //     keycloak?.idTokenParsed?.preferred_username.toUpperCase(),
    //     loc.pathname
    //   );

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
    // settokenavailability(false)
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
