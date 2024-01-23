import React, { useState } from "react";
import Logo from "../assets/yflogo.png";
import { useSelector } from "react-redux";
import axiosInstance from "../services/LocalAxiosInstance";
import { handleReactSelectCss } from "../commonmodules/ReactSelectCss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
const InitialUserUI = ({setnavflag,navflag}) => {
  let trainerurl = "/users/trainerlist";
  let gymaddressurl = "location/gymaddress";
  let submiturl = "users/update";

  const nav = useNavigate();
  const [options5, setoptions5] = useState([]);
  const [options6, setoptions6] = useState([]);
  let formjson = {
    gymName: "",
    ownerId: "",
    trainerId: "",
    trainerName: "",
    gymId:""
  };

  const [formdata, setformdata] = useState({ ...formjson });
  const loginDetails = useSelector((e) => e.logindetails.data);
  console.log(loginDetails);
const[flag,setflag] = useState(false);

  
  const submitfun = async () => {
    let localjson = {};

    localjson.userId = parseInt(loginDetails.userId);
    localjson.firstName = loginDetails.firstName;
    localjson.lastName = loginDetails.lastName;
    localjson.gender = loginDetails.gender;
    localjson.emailId = loginDetails.emailId;
    localjson.activeFlag = true;
    localjson.parentUserId = formdata.trainerId;
    localjson.locationId = parseInt(loginDetails.locationDetails.locationId);
    localjson.gymId = formdata.gymId

    console.log(localjson)
    setflag(true);
    try {
      const res = await axiosInstance.post(submiturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {

          // setnavflag(true)
          toast("🦄 User Updated Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              setnavflag(true)
              nav("/portal/home");

            },
          });
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
    setflag(false);
  };

  console.log(loginDetails);
  const getGymAddress = async () => {
    try {
      const res = await axiosInstance.post(gymaddressurl, {
        location_id: loginDetails?.locationDetails?.locationId,
      });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.gymAddressList.map((d) => ({
            value: d.gymId,
            label: d.gymName,
            extrakey:d.ownerId
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

  const getTrainerList = async () => {
    try {
      const res = await axiosInstance.post(trainerurl, {
        ownerId: formdata.ownerId,
      });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.listOfTrainers.map((d) => ({
            value: d.userId,
            label: d.trainerName,
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
  function handlegymaddress(e) {
    let l = { ...formdata };

    l.gymId = e.value;
    l.gymName = e.label;
    l.ownerId = e.extrakey;

    
    setformdata({ ...l });
  }
  function handleTrainer(e) {
    let l = { ...formdata };

    l.trainerId = e.value;
    l.trainerName = e.label;

    setformdata({ ...l });
  }
  return (
    <div className=" h-screen">
      <div className="h-20 w-56 p-2">
        <img src={Logo} alt="Nav Logo" />
      </div>

      <div className="text-white text-4xl p-4 pl-9 font-sans">
        Hello {loginDetails.userName}! Welcome to YouFit gyms
      </div>
      <div className=" w-screen flex items-center justify-center">
        <div className="flex flex-col pt-7">
          <div className="text-white text-2xl ">
            Please select the Gym address and Trainer
          </div>
          <div class="mb-5 mt-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <Select
              id="gymAddress"
              name="gymAddress"
              placeholder="Gym Address"
              // styles={
              //   mandatoryData.includes("gender") && !data.gender
              //     ? handleReactSelectCss("small", true)
              //     : handleReactSelectCss("small", false)
              // }

              styles={handleReactSelectCss("xlarge2", false)}
              onChange={(e) => handlegymaddress(e)}
              value={
                formdata.gymId
                  ? [
                      {
                        value: formdata.gymId,
                        label: formdata.gymName,
                      },
                    ]
                  : []
              }
              // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
              menuPortalTarget={document.body}
              menuPosition={"fixed"}
              onMenuOpen={() => getGymAddress()}
              options={options5}
            ></Select>
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Trainer
            </label>

            <Select
              id="trainer"
              name="trainer"
              placeholder="Trainer"
              // styles={
              //   mandatoryData.includes("gender") && !data.gender
              //     ? handleReactSelectCss("small", true)
              //     : handleReactSelectCss("small", false)
              // }

              styles={handleReactSelectCss("xlarge2", false)}
              onChange={(e) => handleTrainer(e)}
              value={
                formdata.trainerId
                  ? [
                      {
                        value: formdata.trainerId,
                        label: formdata.trainerName,
                      },
                    ]
                  : []
              }
              // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
              menuPortalTarget={document.body}
              menuPosition={"fixed"}
              onMenuOpen={() => getTrainerList()}
              options={options6}
            ></Select>
            {/* <input
              type="password"
              id="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            /> */}
          </div>
          <button
            
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=>submitfun()}
          >
            Submit
            &nbsp;&nbsp;&nbsp;
                    {
                      flag ?<CircularProgress color="inherit" size={"20px"}></CircularProgress>:<></>
                    }

          </button>
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

export default InitialUserUI;
