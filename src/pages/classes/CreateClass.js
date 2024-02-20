import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_3.jpg";
import Select from "react-select";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import axiosInstance from "../../services/LocalAxiosInstance";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const currentDate = new Date();
  const [options,setoptions] = useState([]);
  const nav = useNavigate();
  const classmasterlisturl = "class/master/list";
  const timemasterlisturl = "class/time/details/list";

  const [timedata,settimedata] = useState([]);

  const gettimemasterlist = async () => {
    try {
      const res = await axiosInstance.get(timemasterlisturl);

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res)
          // settimedata([...res?.data?.data?.timeList]);
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

  const getclassmasterlist = async () => {
    try {
      const res = await axiosInstance.get(classmasterlisturl);

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.classList.map((d) => ({
            value: d.classId,
            label: d.className
          }));
          // console.log(res)
          setoptions([...l]);
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

  const dayOptions = [
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
    { value: "7", label: "Sunday" },
  ];

  // Set the start date to the first day of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Set the end date to the last day of the current month
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const month = (date.getMonth());

    const year = date.getFullYear();
    return `${day}-${months[month]}-${year}`;
  };

  useEffect(()=>{
    getclassmasterlist();
    gettimemasterlist();
  },[])
  return (
    <>
      {/* <Header title="Classes" image={HeaderImage}></Header> */}

      {/* <div class="container mx-auto max-w-3xl mt-4 h-screen pt-3" >

<div className='lg:bg-gray-200 sm:bg-gray-200 md:bg-gray-200 h-[85%] overflow-x-hidden overflow-y-hidden bg-gray-200'>


</div>
</div> */}

      <div class="flex mt-20">
        <div class="bg-gray-100 w-11/12 mx-auto max-w-7xl bg-white py-10 px-12 lg:px-12 shadow-xl mb-12">
          <div className="text-black text-lg font-semibold pb-3">
            Create Class for {months[month]} - {year}
          </div>
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Start Date
                </label>
                <input
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="company"
                  type="text"
                  value={formatDate(startOfMonth)}
                  placeholder="Start Date"
                  readOnly
                  disabled={true}
                  //   style={
                  //     mandatoryData.includes("planName") && !formdata?.planName
                  //       ? { border: "2px solid red" }
                  //       : {}
                  //   }
                  //   onChange={(e) => {
                  //     handlechange(e, "planName");
                  //   }}
                  //   value={formdata.planName}
                />
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="title"
                >
                  End Date
                </label>
                <input
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="title"
                  type="text"
                  placeholder="End Date"
                  value={formatDate(endOfMonth)}
                  readOnly
                  disabled={true}
                  //   onChange={(e) => {
                  //     handlechange(e, "planDescription");
                  //   }}
                  //   value={formdata.planDescription}
                  //   style={
                  //     mandatoryData.includes("planDescription") &&
                  //       !formdata?.planDescription
                  //       ? { border: "2px solid red" }
                  //       : {}
                  //   }
                />
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Class*
                </label>

                <Select
                  id="class"
                  name="class"
                  className="mt-1"
                  placeholder="Class"
                    styles={
                  //     mandatoryData.includes("planDuration") &&
                  //       !formdata?.planDuration
                  //       ? handleReactSelectCss("xlarge1", true, true):
                  window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                    }
                  //   // onChange={(e) => handlegender(e)}
                  //   onChange={(e) =>
                  //     handlesingle(e, "planDuration", "planDurationName")
                  //   }
                  //   value={
                  //     formdatalocal?.planDuration
                  //       ? [
                  //         {
                  //           value: formdatalocal.planDuration,
                  //           label: formdatalocal.planDurationName,
                  //         },
                  //       ]
                  //       : []
                  //   }
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                    options={options}
                />
              
              </div>

              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Time*
                </label>
                {/* <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Plan Name"/> */}
                <Select
                  id="time"
                  name="time"
                  className="mt-1"
                  placeholder="Time"
                    styles={
                  //     mandatoryData.includes("planDuration") &&
                  //       !formdata?.planDuration
                  //       ? handleReactSelectCss("xlarge1", true, true):
                  window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)

                    }
                  //   // onChange={(e) => handlegender(e)}
                  //   onChange={(e) =>
                  //     handlesingle(e, "planDuration", "planDurationName")
                  //   }
                  //   value={
                  //     formdatalocal?.planDuration
                  //       ? [
                  //         {
                  //           value: formdatalocal.planDuration,
                  //           label: formdatalocal.planDurationName,
                  //         },
                  //       ]
                  //       : []
                  //   }
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                  //   options={durationOptions}
                />
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="department"
                >
                  DAY*
                </label>
                {console.log(window.innerWidth)}
                <div>
                  <Select
                    id="day"
                    name="day"
                    className="mt-1"
                    placeholder="Day"
                    
                    styles={
                    //   mandatoryData.includes("day") &&
                    //     formdata?.categoryId?.length === 0
                    //     ? handleReactSelectCss("xlarge4", true, true):
                        window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                    }
                    // onChange={(e) => handlemulti(e)}
                    // value={
                    //   formdatalocal?.categoryId
                    //     ? [{ value: formdatalocal.category, label: data.gender }]
                    //     : []
                    // }

                    // onMenuOpen={() => getcategory()}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={dayOptions}
                  />
                </div>
              </div>
            </div>

            <div class="-mx-3 md:flex mt-2">
              <div class="md:w-full px-3">
                <button
                  class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
                  //   onClick={() => postMainData(formdata)}
                >
                  Create Class &nbsp;&nbsp;&nbsp;
                  {/* {flag ? (
                    <CircularProgress
                      color="inherit"
                      size={"20px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )} */}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => nav("/portal/classes")}
            class="md:w-1/5 lg:-ml-11 text-black italic font-bold border-b-4 hover:border-b-2 hover:text-blue-600 hover:underline border-gray-500 hover:border-gray-100 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
