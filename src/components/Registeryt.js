import React, { useEffect, useState } from "react";
import regimg1 from "../icons/regi1.jpg";
import regimg2 from "../icons/regi2.jpg";
import regimg3 from "../icons/regi3.jpg";
import regimg4 from "../icons/regi4.jpg";
import eyeimgon from "../icons/eye.png";
import axiosInstance from "../services/LocalAxiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "./Carousel";
import Errmsg from "../data/Errormsg.json";
import regexData from "../commonmodules/Regextest";
import { handleReactSelectCss } from "../commonmodules/ReactSelectCss";
import { Addrowerror } from "../commonmodules/Addrowerror";
import { CircularProgress } from "@material-ui/core";
import Select from "react-select";
import info_icon from "../assets/information-button.png"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
const Registeryt = () => {
  const [showeye, setShoweye] = useState(false);
  const [showeye1, setShoweye1] = useState(false);
  const [imgeye, setimgeye] = useState();
  const [mandatoryData, setMandatoryData] = useState([]);
  const handleShoweye = () => {
    setShoweye(!showeye);
  };
  const handleShoweye1 = () => {
    setShoweye1(!showeye1);
  };
  const slides = [regimg1, regimg2, regimg3, regimg4];
  const nav = useNavigate();

  let sms = {
    userName: "",
    firstName: "",
    lastName: "",
    gender: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    roleId: "4",
    parentUserId:"",
    locationId:"",
    categoryId:"",
    gymId:""
  };

  let locationdaata = {
    state: "",
    city: "",
    location: "",
    locationId: "",
    gymName:"",
    ownerId:"",
   categoryId:"",
   categoryName:""
  };

  const [locationdata, setlocationdata] = useState({ ...locationdaata });
  const [data, setData] = useState({ ...sms });
  const lableMandatoryData = [
    "firstName",
    "gender",
    "emailId",
    "password",
    "confirmPassword",
    "roleId",
    "locationId",

  ];
  const lableMandatoryData1 = [
    "firstName",
    "gender",
    "emailId",
    "password",
    "confirmPassword",
    "roleId",
    "locationId",
    "categoryId",
    "gymId"
  ];
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/  ;
  const handlechange = (e, name) => {
    let l = { ...data };
    const { value } = e.target;
    if((name === "firstName" || name === "lastName" || name === "userName") &&  regexData(value, "AplhaNumericwithspace").updateState)
    {
      l[name] = value;
    } 
    if(name==="emailId"){
      l[name] = value.toLowerCase();
    }
 
    if((name==="password" || name==="confirmPassword")){
      l[name] = value;
    }



    setData({ ...l });
  };
  let re1 = /^[a-zA-Z0-9 . ]+[@][a-z]+[\.][a-z]{2,3}$/;
  const validateemailid=(email)=>{

    var flag = true;
    if(email){
      for(let i = 0; i < email.length;i++){
        if(re1.test(email) && i!==email.length - 1)
        {
         
          let indlen = email.lastIndexOf(".")
          let atlen = email.indexOf("@");
          let domain = email.substring(indlen+1,email.length)
          let domainnames=["com","in","org","co.in"]        
          if(domainnames.includes(domain)){
            flag=false
          }  
        }
      }
       if(email.includes(" "))
        {
          flag=true
        }
    }
    return flag;
  }
  function handlegender(e) {
    let l = { ...data };
    // l.gender=e.value
    l.gender = e.label;
    setData({ ...l });
  }

  function handlelocation(e, name) {
    let l = { ...locationdata };

    l[name] = e.value;

    if(name==="location"){
      l[name] = e.label;
      l.locationId = e.value;

      let l2= {...data};
      l2.locationId = e.value;
      setData({...l2})
    }
    setlocationdata({ ...l });
  }
  function handlegymaddress(e) {
    let l = { ...locationdata };

    
    l.ownerId = e.value;
    l.gymName=e.label;
 

    let l2 = {...data}
    l2.parentUserId=e.value;
    
    l2.gymId = e.extrakey;
    setData({...l2})

    

    setlocationdata({ ...l });
  }
  function handlecategory(e) {
    let l = { ...data };
    let l2 = {...locationdata};

    l2.categoryId = e.value;
    l2.categoryName = e.label;

    l.categoryId = e.value;
    // l.ownerId = e.value;
    // l.gymName=e.label;

    // let l2 = {...data}
    // l2.parentUserId=e.value;
    // setData({...l2})
    setData({ ...l });
    setlocationdata({...l2})
  }

  const handleradio = (e,name) => {
    const te = { ...data };

    te.roleId = e.target.value;

    if(name==="user"||name==="owner"){
      te.parentUserId = ""
    }
    setData(te);
  };

  const genderoption = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [options2, setoptions2] = useState([]);
  const [options3, setoptions3] = useState([]);
  const [options4, setoptions4] = useState([]);
  const [options5, setoptions5] = useState([]);
  const [options6, setoptions6] = useState([]);
  const handleselect = (e) => {
    let l = { ...data };
    l.gender = e.value;
    setData({ ...l });
  };

  let createuserurl = "users/create";
  let stateurl = "location/state";
  let cityurl = "location/city";
  let locationaddressurl = "location/address/filter";
  let locationaddressurl2 = "location/address";
  let gymaddressurl = "location/gymaddress";  
  let getcategoryurl = "/user/category/list";
  const [err, seterr] = useState({ message: "" });
  let [errcode, seterrcode] = useState("");

  const [flag,setflag] = useState(false);
  async function postMainData(gdata) {
    let res = Addrowerror(lableMandatoryData, data);
    let res1 = Addrowerror(lableMandatoryData1, data);
  
     if (res?.length > 0) {
      // if (parseInt(data.roleId)===parseInt(4)||parseInt(data.roleId)===parseInt(2)){
        setMandatoryData([...res]);
      // }
      // else{
      //   setMandatoryData([...res1]);
      // }
      console.log(res.length,data.roleId)
       
     
       console.log("cdgvsghd")
     }
     
     else if(data.password !==data.confirmPassword){
 console.log("ppp")
      const l = { ...err };
      l.message = Errmsg["usrwrng01"];
      seterrcode(l.message);
    }
     else if(validateemailid(data.emailId)){
      console.log("hh")
      seterrcode(Errmsg["wrng019"])

     }

     else if(!re.test(data.password)){
      console.log("ghsvcgh")
      seterrcode(Errmsg["wrng018"])
     }
 
    
    else {
      console.log("chgvhdgcv")
      const dat = { ...gdata };
      setflag(true);
      // console.log(dat);
      try {
        const res = await axiosInstance.post(createuserurl, dat);

        if (res?.status === 200) {
          if (res?.data?.status) {
            // console.log("user created");
            
            setData({ ...sms });
            setlocationdata({...locationdaata})
            toast(` ${parseInt(data.roleId)===parseInt(4) ? "User" : parseInt(data.roleId)===parseInt(3) ? "Trainer" :"Owner" } Created Successfully`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                nav("/portal");
              },
            });

            // nav("/");
          } else {
          }
        } else if (res?.response.status === 401) {
        } else {
        }
      } catch (err) {}
      setflag(false);
    }

  }
  const getcity = async () => {
    try {
      const res = await axiosInstance.post(cityurl, { state: locationdata.state });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.citylist.map((d) => ({
            value: d.city,
            label: d.city,
          }));
          setoptions3([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };

  const getlocation = async () => {
    try {
      const res = await axiosInstance.post(locationaddressurl, { state: locationdata.state,city:locationdata.city });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.addressList.map((d) => ({
            value: d.locationId,
            label: d.locationAddress,
          }));
          setoptions4([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };


  const getlocation2 = async () => {
    try {
      const res = await axiosInstance.post(locationaddressurl2, { state: locationdata.state,city:locationdata.city });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.addressList.map((d) => ({
            value: d.locationId,
            label: d.locationAddress,
          }));
          setoptions4([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };
  const getGymAddress = async () => {
    try {
      const res = await axiosInstance.post(gymaddressurl, { locationId:locationdata.locationId});

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.gymAddressList.map((d) => ({
            value: d.ownerId,
            label: d.gymName + " " +d.gymAddress,
            extrakey:d.gymId
          }));
          setoptions5([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };
  const getcategory = async () => {


    try {
      const res = await axiosInstance.post(getcategoryurl,{gymId:data?.gymId});

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.categoryDetailsList.map((d) => ({
            value: d.categoryId,
            label: d.categoryName,
          }));
          setoptions6([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };
  const getstate = async () => {
    try {
      const res = await axiosInstance.get(stateurl);

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.stateList.map((d) => ({
            value: d.stateName,
            label: d.stateName
          }));
          // console.log(res)
          setoptions2([...l]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };
  const popover = (
    <Popover id="popover-basic" className="bg-gray-500 rounded-lg">
      <Popover.Body className="text-sm font-normal p-1 m-1 ">
        Password length: 8-14 characters Password should contain:
        <br />
        Atleast <strong>one</strong> integer
        <br />
        Atleast <strong>one</strong> lower-case character
        <br />
        Atleast <strong>one</strong> upper-case character
        <br />
        Atleast <strong>one</strong> Special Character
        !@#$&amp;%^*_+\-=;':"/|,.?
      </Popover.Body>
    </Popover>
  );
  useEffect(() => {
    // getcity();
    getstate();
  }, []);

  return (
    <div className="h-full">
      <div className="mx-auto">
        <div className="flex ">
          {/* <div className="text-white font-bold text-2xl -mt-10 mr-6">YOUBLOG</div> */}
          <div className="w-full h-screen flex">
            <div className="w-full h-auto bg-gray-400 dark:bg-black hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
              <div className="">
                <Carousel autoslide={true}>
                  {slides.map((s) => (
                    <img src={s} alt="register" />
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="w-full lg:w-7/12  bg-white dark:bg-zinc-800 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-zinc-600 rounded font-sans">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="bg-white w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      autoComplete="off"
                      name="firstName"
                      value={data.firstName}
                      onChange={(e) => handlechange(e, "firstName")}
                      style={
                        mandatoryData.includes("firstName") && !data.firstName
                          ? { border: "2px solid red" }
                          : {}
                      }
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="bg-white w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      autoComplete="off"
                      value={data.lastName}
                      name="lastName"
                      onChange={(e) => handlechange(e, "lastName")}
                      // style={
                      //   mandatoryData.includes("lastName") && !data.lastName
                      //     ? { border: "2px solid red" }
                      //     : {}
                      // }
                    />
                  </div>
                  <div className="md:ml-2">
                    {/* <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Gender
                    </label>
               

                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Gender"
                      styles={
                        mandatoryData.includes("gender") && !data.gender
                          ? handleReactSelectCss("normal", true)
                          : handleReactSelectCss("normal", false)
                      }
                      onChange={(e) => handlegender(e)}
                      value={
                        data?.gender
                          ? [{ value: data.gender, label: data.gender }]
                          : []
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={genderoption}
                    ></Select> */}
                         <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="NickName"
                    >
                      Nick Name
                    </label>
                    <input
                      className="bg-white w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="userName"
                      // style={
                      //   mandatoryData.includes("userName") && !data.userName
                      //     ? { border: "2px solid red" }
                      //     : {}
                      // }
                      type="text"
                      autoComplete="off"
                      placeholder="Nick Name"
                      name="userName"
                      value={data.userName}
                      onChange={(e) => handlechange(e, "userName")}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-white w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="emailId"
                    style={
                      mandatoryData.includes("emailId") && !data.emailId
                        ? { border: "2px solid red" }
                        : {}
                    }
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={data.emailId}
                    name="emailId"
                    onChange={(e) => handlechange(e, "emailId")}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between relative z-0">
                  <div className="mb-4 md:mr-2 md:mb-0 z-0 relative">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={
                        data.password === ""
                          ? " bg-white relative w-full z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          : "bg-white relative w-full  z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      }
                      style={
                        mandatoryData.includes("password") && !data.password
                          ? { border: "2px solid red" }
                          : {}
                      }
                      id="password"
                      type={showeye ? "text" : "password"}
                      placeholder="******************"
                      name="password"
                      autoComplete="off"
                      value={data.password ? data.password:""}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      maxLength={14}
                      onChange={(e) => handlechange(e, "password")}
                    />
                    <img
                      className="h-5 w-5 z-[100] -mt-10 cursor-pointer absolute right-2"
                      src={eyeimgon}
                      alt="eye"
                      onClick={handleShoweye}
                    ></img>
                   
                    <OverlayTrigger
                      hover="click"
                      placement="right"
                      overlay={popover}
                    >
                      <img
                        src={info_icon}
                        alt="info_icon"
                        className="h-3 w-3 absolute -right-5 top-12 cursor-pointer"
                        // className={
                        //   false ? `${userAdd.info_disabled}` : `${userAdd.info}`
                        // }
                      ></img>
                    </OverlayTrigger>

                    
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0 z-0 relative">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      // className="bg-white w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      className={
                        data.confirmPassword === ""
                          ? " bg-white relative w-full z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          : "bg-white relative w-full  z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      }
                      id="confirmPassword"
                      type={showeye1 ? "text" : "password"}
                      autoComplete="off"
                      style={
                        mandatoryData.includes("confirmPassword") &&
                        !data.confirmPassword
                          ? { border: "2px solid red" }
                          : {}
                      }
                      placeholder="******************"
                      name="confirmPassword"
                      value={data.confirmPassword}  
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      maxLength={14}
                      onChange={(e) => handlechange(e, "confirmPassword")}
                    />
                          <img
                      className="h-5 w-5 z-[100] -mt-10 cursor-pointer absolute right-2"
                      src={eyeimgon}
                      alt="eye"
                      onClick={handleShoweye1}
                    ></img>
                   
                  </div>
              
               
                    <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Gender
                    </label>
               

                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Gender"
                      styles={
                        mandatoryData.includes("gender") && !data.gender
                          ? handleReactSelectCss("normal", true,false)
                          : handleReactSelectCss("normal", false,false)
                      }
                      onChange={(e) => handlegender(e)}
                      value={
                        data?.gender
                          ? [{ value: data.gender, label: data.gender }]
                          : []
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={genderoption}
                    ></Select>
                  </div>
                 
                </div>

                <div className="mb-4 md:flex md:justify-between relative z-0">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      defaultChecked
                      name="roleId"
                      // id="roleId"
                      onClick={(e) => handleradio(e,"user")}
                      value={4}
                    />
                    <label className="text-white font-semibold text-sm">
                       Register As User
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="roleId"
                      // id="roleId"
                      onClick={(e) => handleradio(e,"trainer")}
                      value={3}
                    />
                    <label className="text-white font-semibold text-sm">
                    Register Request Trainer
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="roleId"
                      onClick={(e) => handleradio(e,"owner")}
                      value={2}
                    />
                    <label className="text-white font-semibold text-sm">
                      Register Request Owner
                    </label>
                  </div>
                </div>


                <div className={parseInt(data.roleId)===parseInt(3) ?"mb-4 md:flex justify-between relative z-0" :"mb-4 md:flex justify-between relative z-0"}>
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="city"
                    >
                      State
                    </label>

                    <Select
                      id="state"
                      name="state"
                      placeholder="State"
                      // styles={(mandatoryData.includes("state") && !data.gender) ? handleReactSelectCss("small", true):handleReactSelectCss("small", false)}
                      // styles={handleReactSelectCss("large", false)}
                      onChange={(e) => handlelocation(e, "state")}
                      value={
                        locationdata?.state
                          ? [
                              {
                                value: locationdata.state,
                                label: locationdata.state,
                              },
                            ]
                          : []
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}

                      styles={parseInt(data.roleId)===parseInt(3) ? handleReactSelectCss("small", false): handleReactSelectCss("large", false)}

                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={options2}
                    ></Select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="state"
                    >
                      City
                    </label>

                    <Select
                      id="city"
                      name="city"
                      placeholder="City"
                      
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }
                      styles={parseInt(data.roleId)===parseInt(3) ? handleReactSelectCss("small", false): handleReactSelectCss("large", false)}
                      onChange={(e) => handlelocation(e,"city")}
                      value={
                        locationdata?.city
                          ? [
                              {
                                value: locationdata.city,
                                label: locationdata.city,
                              },
                            ]
                          : []
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getcity()}
                      options={options3}
                    ></Select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="location"
                    >
                      Location
                    </label>

                    <Select
                      id="location"
                      name="location"
                      placeholder="Location"
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }

                      styles={parseInt(data.roleId)===parseInt(3) ? handleReactSelectCss("small", false):mandatoryData.includes("locationId") && !data.locationId
                           ? handleReactSelectCss("large", true):handleReactSelectCss("large", false)}
                      onChange={(e) => handlelocation(e,"location")}
                      value={
                     
                        locationdata.location
                          ? [
                              {
                                value: locationdata.locationId,
                                label: locationdata.location,
                              },
                            ]
                          : []
                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>parseInt(data.roleId)===parseInt(2)?getlocation2():getlocation()}
                      options={options4}
                    ></Select>
                  </div>



                  {parseInt(data.roleId)===parseInt(3)?<div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="category"
                    >
                      Category
                    </label>

                    <Select
                      id="category"
                      name="categoryId"
                      placeholder="Category"
                   
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }

                      // styles={handleReactSelectCss("large", false)}

                      styles={parseInt(data.roleId)===parseInt(3) && mandatoryData.includes("categoryId") && !data.categoryId? handleReactSelectCss("small", true): handleReactSelectCss("small", false)}

                      onChange={(e) => handlecategory(e)}
                      value={
                      locationdata?.categoryId
                      ?
                      [
                        {
                          value: locationdata.categoryId,
                          label: locationdata.categoryName
                        }
                      ]:[]     
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getcategory()}
                      options={options6}
                    ></Select>
                  </div>:<></>}




                </div>


<div className="mb-4 md:flex md:justify-between relative z-0">
  
{parseInt(data.roleId)===parseInt(3)?<div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="location"
                    >
                      Gym Address
                    </label>

                    <Select
                      id="gymAddress"
                      name="gymAddress"
                      placeholder="Gym Address"
                      className="leading-4"
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }

                      // styles={handleReactSelectCss("large", false)}

                      styles={parseInt(data.roleId)===parseInt(3) && mandatoryData.includes("gymId") && !data.gymId ? handleReactSelectCss("xlarge4", true): handleReactSelectCss("xlarge4", false)}

                      onChange={(e) => handlegymaddress(e)}
                      value={
                     
                       locationdata.ownerId
                          ? [
                              {
                                value: locationdata.ownerId,
                                label: locationdata.gymName,
                              },
                            ]
                          : []
                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getGymAddress()}
                      options={options5}
                    ></Select>

                   {data.gymId === "" ? (
                      <p className="text-xs italic text-red-500">
                        Please choose state,city and location.
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>:<></>}
</div>
 {errcode ? (
                      <p className="text-xs italic text-red-500">
                        {errcode}
                      </p>
                    ) : (
                      <></>
                    )}

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-zinc-900 rounded-full hover:bg-blue-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      postMainData(data);
                    }}
                    // onClick={()=>console.log(data)}
                  >
                    Register Account
                    &nbsp;&nbsp;&nbsp;
                    {
                      flag ?<CircularProgress color="inherit" size={"20px"}></CircularProgress>:<></>
                    }
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  {/* <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="#">
								Forgot Password?
							</a> */}
                </div>
                <div
                  className="text-center text-lg text-zinc-800 dark:text-white align-baseline hover:text-black hover:underline hover:cursor-pointer"
                  onClick={() => nav("/portal")}
                >
                  {/* <a
                    className="inline-block text-lg text-zinc-800 dark:text-white align-baseline hover:text-black hover:underline"
                    href={window.location.origin}
                  > */}
                  {/* {window.location.origin} */}
                  Already have an account? Login!
                  {/* </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast"
      />
    </div>
  );
};

export default Registeryt;
