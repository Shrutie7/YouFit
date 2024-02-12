import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../services/LocalAxiosInstance";
import Logo from "../assets/yflogo.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import { handleReactSelectCss } from "../commonmodules/ReactSelectCss";
const InitialOwnerUI = ({ setnavflag, nacflag }) => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  console.log(loginDetails);

  const nav = useNavigate();
  const gymcreateurl = "/gymcreate";
  const updateurl = "users/update";

  let options = [
    {
value:1,
label:"YouFit Gyms Pro"
    },
    {
value:2,
label:"YouFit Gyms Elite"

    }
  ]
  const gymjson = {
    dno: "",
    street: "",
    pincode: "",
    contact: "",
    gymName: "",
    gymId:""
  };

  const [gymdata, setgymdata] = useState({ ...gymjson });
  const handlechange = (e, name) => {
    let l = { ...gymdata };
    l[name] = e.target.value;
    console.log(l);
    setgymdata({ ...l });
  };

 const  handlegymaddress=(e)=>{
  let l  = {...gymdata};
  l.gymName = e.label;
  l.gymId = e.value;
  setgymdata({ ...l });

  }

    const updatefun = async () => {
    let localjson = {};

    localjson.userId = parseInt(loginDetails.userId);
    localjson.firstName = loginDetails.firstName;
    localjson.lastName = loginDetails.lastName;
    localjson.userName  = loginDetails.userName;
    localjson.gender = loginDetails.gender;
    localjson.emailId = loginDetails.emailId;
    localjson.activeFlag = true;
    localjson.parentUserId = 1;
    localjson.locationId = parseInt(loginDetails.locationDetails.locationId);
    localjson.gymId = "";

    console.log(localjson)

    try {
      const res = await axiosInstance.post(updateurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {

          // setnavflag(true)
          // toast("🦄 User Updated Successfully", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          //   onClose: () => {
          //     setnavflag(true)
          //     nav("portal");

          //   },
          // });
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

  const submitfun = async () => {
    let localjson = {};

    localjson.gymName = gymdata.gymName;
    localjson.doorNo = gymdata.dno;
    localjson.streetLane = gymdata.street;
    localjson.pincode = gymdata.pincode;
    localjson.contact = gymdata.contact;
    localjson.locationId = parseInt(loginDetails.locationDetails.locationId);
    localjson.ownerId = parseInt(loginDetails.userId);

    console.log(localjson);

    try {
      const res = await axiosInstance.post(gymcreateurl, {
        ...localjson,
      });

      if (res.status === 200) {
        if (res.data.status) {
          updatefun();
          toast(" Gym Created Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              setnavflag(true);
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
    } catch (error) {}
  };
  return (
    <div>
      <div className=" h-screen">
        <div className="h-20 w-56 p-2">
          <img src={Logo} alt="Nav Logo" />
        </div>

        <div className="text-white text-4xl p-4 pl-9 font-sans">
          Hello {loginDetails.userName}! Welcome to YouFit gyms
        </div>
        <div className=" w-screen flex items-center justify-center">
          <div className="flex flex-col pt-7 w-96">
            <div className="text-white text-2xl ">
              Please add Gym Address Details
            </div>
            <div class="mb-5 mt-5">
              <label
                for="GymName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gym Name
              </label>
              {/* <input
                type="text"
                id="gymname"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                placeholder="Gym Name"
                onChange={(e) => handlechange(e, "gymName")}
              /> */}


              <Select

              options={options}
              value={options.filter((e)=>(e.value === gymdata.gymId))}
              id="GymName"
              name="gymName"
              placeholder="Gym Name"

              onChange={(e) => handlegymaddress(e)}

              styles={handleReactSelectCss("xlarge1", false)}

              menuPortalTarget={document.body}
              menuPosition={"fixed"}
              

              />
            </div>
            <div class="mb-5">
              <label
                for="dno"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Door No
              </label>
              <input
                type="text"
                id="Street"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                placeholder="Door Number"
                onChange={(e) => handlechange(e, "dno")}
              />
            </div>
            <div class="mb-5">
              <label
                for="street"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street/Lane
              </label>

              <input
                type="text"
                id="Street"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                placeholder="Street/Lane"
                onChange={(e) => handlechange(e, "street")}
              />
            </div>
            <div class="mb-5">
              <label
                for="pincode"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pincode
              </label>

              <input
                type="text"
                id="pincode"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                placeholder="Pincode"
                maxLength={6}
                onChange={(e) => handlechange(e, "pincode")}
              />
            </div>
            <div class="mb-5">
              <label
                for="contact"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contact
              </label>

              <input
                type="text"
                id="contact"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                maxLength={10}
                placeholder="Contact"
                onChange={(e) => handlechange(e, "contact")}
              />
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => submitfun()}
            >
              Submit
            </button>
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

export default InitialOwnerUI;
