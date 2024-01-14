import React, { useState } from "react";
import regimg1 from "../icons/regi1.jpg";
import regimg2 from "../icons/regi2.jpg";
import regimg3 from "../icons/regi3.jpg";
import regimg4 from "../icons/regi4.jpg";
import eyeimgon from "../icons/eye.png";
import axiosInstance from "../services/LocalAxiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "./Carousel";
import { handleReactSelectCss } from '../commonmodules/ReactSelectCss'
import { Addrowerror } from "../commonmodules/Addrowerror";
import Select from "react-select";
const Registeryt = () => {
  const [showeye, setShoweye] = useState(false);
  const [imgeye, setimgeye] = useState();
  const [mandatoryData, setMandatoryData] = useState([]);
  const handleShoweye = () => {
    setShoweye(!showeye);
  };
  const slides = [regimg1, regimg2, regimg3, regimg4];
  const nav = useNavigate();


//   {
//     "username":"2341234",
//     "firstName":"Killua",
//     "lastName":"Zoldyck",
//     "emailId":"kzdyck@gmail.com",
//     "gender":"Male",
//     "password":"Kzdyck@411",
//     "confirmPassword":"Kzdyck@411",
//     "roleId":4, //based on type of user registration 
//     "parentUserId":3, //based on gym selection and trainer selection
//     "locationId":3 //based on user selection of location
// }

  let sms = {
    personalNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    roleId:""
  };
  const [data, setData] = useState({ ...sms });
  const lableMandatoryData = [
    "personalNo",
    "firstName",
    "lastName",
    "gender",
    "emailId",
    "password",
    "confirmPassword",
    "roleId"
  ];
  const handlechange = (e, name) => {
    let l = { ...data };
    l[name] = e.target.value;
    setData({ ...l });
  };
  function handlegender(e){
    let l={...data}
    // l.gender=e.value
    l.gender=e.label
    setData({...l})

}

const handleradio = (e) => {
  const te = { ...data };
  console.log(e.target.value);
te.roleId = e.target.value;
  setData(te);
};

  const genderoption = [{value:"male",label:"Male"},{value:"female",label:"Female"},{value:"other",label:"Other"}];
  const handleselect = (e) => {
    let l = { ...data };
    l.gender = e.value;
    setData({ ...l });
  };
  let createuserurl = "users/create";
  async function postMainData(gdata) {
    let res = Addrowerror(lableMandatoryData, data);
    if (res?.length > 0) {
      // var nameId = res?.at(0);
      // document.getElementsByName(nameId)[0].focus();
      setMandatoryData([...res]);
      // res?.forEach((ele) => {
      //     let doc = document.getElementsByName(ele)[0]
      //     doc.style.border = "2px solid red"
      // })
    } else {
      const dat = { ...gdata };

      console.log(dat);
      try {
        const res = await axiosInstance.post(createuserurl, dat);

        if (res?.status === 200) {
          if (res?.data?.status) {
            console.log("user created");
            setData({ ...sms });
            toast("🦄 User created Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                nav("/");
              },
            });

            // nav("/");
          } else {
          }
        } else if (res?.response.status === 401) {
        } else {
        }
      } catch (err) {}
    }
  }

  return (
    <div className="h-screen">
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

            <div className="w-full lg:w-7/12 bg-white dark:bg-zinc-800 p-5 rounded-lg lg:rounded-l-none">
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
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
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
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={data.lastName}
                      name="lastName"
                      onChange={(e) => handlechange(e, "lastName")}
                      style={
                        mandatoryData.includes("lastName") && !data.lastName
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
                      Gender
                    </label>
                    {/* <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="gender"
                      type="text"
                      placeholder="Gender"
                      value={data.gender}
                      name="gender"
                      onChange={(e) => handlechange(e, "gender")}
                    /> */}
               

                    <Select
                     id="gender"
                     name="gender"
                     placeholder="Gender"
                    styles={(mandatoryData.includes("gender") && !data.gender) ? handleReactSelectCss("normal", true):handleReactSelectCss("normal", false)}
              
                    onChange={(e) => handlegender(e)}
                    value={data?.gender?[{"value":data.gender,"label":data.gender}]:[]}
                    // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={genderoption}
                  ></Select>
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
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="emailId"
                    style={
                      mandatoryData.includes("emailId") && !data.emailId
                        ? { border: "2px solid red" }
                        : {}
                    }
                    type="email"
                    placeholder="Email"
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
                          ? " relative w-full z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          : "relative w-full  z-0 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                      value={data.password}
                      onChange={(e) => handlechange(e, "password")}
                    />
                    <img
                      className="h-5 w-5 z-[100] -mt-10 cursor-pointer absolute right-2"
                      src={eyeimgon}
                      alt="eye"
                      onClick={handleShoweye}
                    ></img>
                    {data.password === "" ? (
                      <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mr-2 md:ml-2">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="confirmPassword"
                      type="password"
                      style={
                        mandatoryData.includes("confirmPassword") &&
                        !data.confirmPassword
                          ? { border: "2px solid red" }
                          : {}
                      }
                      placeholder="******************"
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={(e) => handlechange(e, "confirmPassword")}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="personalNo"
                    >
                      Personal No
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="personalNo"
                      style={
                        mandatoryData.includes("personalNo") && !data.personalNo
                          ? { border: "2px solid red" }
                          : {}
                      }
                      type="text"
                      placeholder="Personal No"
                      name="personalNo"
                      value={data.personalNo}
                      onChange={(e) => handlechange(e, "personalNo")}
                    />
                  </div>
                </div>

                <div className="mb-4 md:flex md:justify-between relative z-0">
                  <div className="flex gap-2">
                    <input type="radio" name="roleId" id = "roleId" onClick={(e)=>handleradio(e)} value={4}/>
                    <label className="text-white font-semibold text-sm">
                      Request User Register
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="roleId" id = "roleId" onClick={(e)=>handleradio(e)} value={3}/>
                    <label className="text-white font-semibold text-sm">
                      Request Trainer Register
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="roleId" onClick={(e)=>handleradio(e)} value={2}/>
                    <label className="text-white font-semibold text-sm">
                      Request Owner Register
                    </label>
                  </div>
                </div>

                {/* <div className="mb-4 md:flex md:justify-between relative z-0">
                  <div className="flex flex-col">
                  <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="city"
                    >
                      City
                    </label>
               

                    <Select
                     id="gender"
                     name="gender"
                     placeholder="City"
                    styles={(mandatoryData.includes("gender") && !data.gender) ? handleReactSelectCss("small", true):handleReactSelectCss("small", false)}
              
                    onChange={(e) => handlegender(e)}
                    value={data?.gender?[{"value":data.gender,"label":data.gender}]:[]}
                    // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={genderoption}
                  ></Select>
                  </div>
                  <div className="flex flex-col">
                  <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="state"
                    >
                      State
                    </label>
             
               

                    <Select
                     id="gender"
                     name="gender"
                     placeholder="State"
                    styles={(mandatoryData.includes("gender") && !data.gender) ? handleReactSelectCss("small", true):handleReactSelectCss("small", false)}
              
                    onChange={(e) => handlegender(e)}
                    value={data?.gender?[{"value":data.gender,"label":data.gender}]:[]}
                    // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={genderoption}
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
                     id="gender"
                     name="gender"
                     placeholder="Location"
                    styles={(mandatoryData.includes("gender") && !data.gender) ? handleReactSelectCss("small", true):handleReactSelectCss("small", false)}
              
                    onChange={(e) => handlegender(e)}
                    value={data?.gender?[{"value":data.gender,"label":data.gender}]:[]}
                    // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={genderoption}
                  ></Select>
                  </div>
                </div> */}
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-zinc-900 rounded-full hover:bg-blue-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => {
                      postMainData(data);
                    }}
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  {/* <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="#">
								Forgot Password?
							</a> */}
                </div>
                <div className="text-center text-lg text-zinc-800 dark:text-white align-baseline hover:text-black hover:underline hover:cursor-pointer" onClick={()=>nav("/portal")}>
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
        autoClose={5000}
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
