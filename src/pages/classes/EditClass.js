import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import axiosInstance from "../../services/LocalAxiosInstance";
import { ToastContainer, toast } from "react-toastify";


const EditClass = () => {
  const currentDate = new Date();
  const classesdata = useSelector((e)=>e.classesstore.data.data);
  const classmasterlisturl = "class/master/list";
  const [stri,setstri] = useState("")
  const classediturl = "class/update";
  const loc = useSelector((e)=>e.location.state);
  console.log(loc?.state)
  const [options,setoptions] = useState([]);
  const [flag,setflag] = useState(false)
  const nav = useNavigate();
  const [timeoptions,settimeoptions] = useState([]);
const [updateflag,setupdateflag] = useState(false);
const [formtimeid,setformtimeid] = useState(false)
  const getediturl = "class/get"

  const [timechangeflag,settimechangeflag] = useState(false)

let [formdata,setformdata] = useState({});

const handlechangeselect = (e,name,opt)=>{

  let l = {...formdata};

  // if(name === "classMasterId"){
  //   l.classMasterId = e.value;
  // }
  if(name === "timeDetailsId"){
    settimechangeflag(true);
    setupdateflag(true)
    l.timeDetailsId = e.value;
  }
  // if(name === "weekDay"){
  //   l.weekDay = e.label;
  // }

  setformdata({...l})


}
  const timemasterlisturl = "class/time/details/list";

  const geteditapi = async () => {
    try {
      const res = await axiosInstance.post(getediturl,{classDetailsId:loc.state.classDetailsId});

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res)
    console.log(res?.data?.data)

    let fd = {...formdata};
    fd.classMasterId = res?.data?.data?.classMasterId;
    fd.timeDetailsId = res?.data?.data?.timeDetailsId;
    fd.weekDay = res?.data?.data?.weekDay;
    fd.startDate = res?.data?.data?.startDate;
    fd.endDate = res?.data?.data?.endDate;

    setformtimeid(res?.data?.data?.timeDetailsId)
setformdata({...fd})

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


  const updateapi = async (str) => {
    let localjson = {};
    setflag(true)
    localjson.classDetailsId = loc?.state?.classDetailsId;
    localjson.activeFlag = str === "cancelclass" ? false:true;
    localjson.tempCancelFlag = str === "cancelnextclass" ? true:false;
    localjson.tempChangeFlag = str === "update" ? true : false;
    localjson.tempTimeId = str === "update" ?formdata?.timeDetailsId:null;
    try {
      const res = await axiosInstance.post(classediturl,localjson);

      if (res.status === 200) {
        if (res.data.status) {
      
    console.log(res?.data?.data)

    toast(`${str === "cancelnextclass" ? "Next Class cancelled successfully": str==="update" ? "Next Class updated successfully":"Class cancelled successfully"}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        // setnavflag(true);
        nav("/portal/classes");
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
    setflag(false)
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
  const gettimemasterlist = async () => {
    try {
      const res = await axiosInstance.get(timemasterlisturl);

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res)
          // settimedata([...res?.data?.data?.timeList])

          let l = res.data.data.timeList.map((d) => ({
            value: d.timeDetailsId,
            label: d.timings
          }));

          let arr7 = []
          let arr8 = [];
          let arr = [];
          let json = {};
          console.log(classesdata)
      classesdata?.forEach((ele)=>{
        json.weekday = ele?.weekDay ; 
        json.classCount = ele?.classCount;
        ele?.classes?.forEach((subele)=>{
          json.timings = subele?.timings;
          json.tempTimings = subele?.tempTimings;
          json.tempChangeFlag = subele?.tempChangeFlag;
          arr.push({...json})
        })
      
      })
          console.log(arr)
          arr.forEach((ele)=>{
            console.log((formdata?.weekDay?.charAt(0)?.toLowerCase() + formdata?.weekDay?.slice(1)) ,"jkjhkj", ele?.weekday,ele?.timings)
            if(!ele?.tempChangeFlag && (formdata?.weekDay?.charAt(0)?.toLowerCase() + formdata?.weekDay?.slice(1)) === ele?.weekday)
            {
               arr7.push(ele?.timings)
            }
             if(ele?.tempChangeFlag &&(formdata?.weekDay?.charAt(0)?.toLowerCase() + formdata?.weekDay?.slice(1)) === ele?.weekday){
              arr7.push(ele?.tempTimings)
            }
        
            arr8 = [...arr7];
          })
          
          console.log(arr8)
         
          let arr2 = []

          l?.forEach((ele)=>{
            console.log(arr8.includes(ele.label),"kik")
            if(!arr8.includes(ele.label))
            {
               arr2.push({label:ele.label,value:ele.value })
            }
          })
          console.log(arr2)

          settimeoptions([...arr2])
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
  const formatDate = (date) => {

    const parsedDate = new Date(date)
    const day = parsedDate.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const month = (parsedDate.getMonth());

    const year = parsedDate.getFullYear();
    return `${day} ${months[month]} ${year}`;
  };
    const formatDate1 = date => {
    const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const month = (date.getMonth());

    const year = date.getFullYear().toString().substring(2,4);
    return `${day} ${months[month]} ${year}`;
  };


  const getvalues = (opt,name)=>{

    let m1 = opt.filter((e)=>e.value === formdata?.[name] );

 return m1;


 
  }
  useEffect(()=>{
geteditapi();
gettimemasterlist();
getclassmasterlist();
  },[])



  return (
<>
<div class="flex mt-32">
        <div class="bg-gray-100 w-11/12 mx-auto max-w-7xl bg-white py-10 px-12 lg:px-12 shadow-2xl mb-12">
          <div className="text-black text-lg font-semibold pb-3">
            Edit Class for {months[month]} - {year}
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
                  value={formatDate(formdata.startDate)}
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
                  value={formatDate(formdata.endDate)}
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
                  for="department"
                >
                  DAY*
                </label>
            
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
                        // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                        handleReactSelectCss("xlarge6", false, false,false,false,true)
                    }
                    onChange={(e) => handlechangeselect(e,"weekDay")}
                    // value={
                    //   formdatalocal?.categoryId
                    //     ? [{ value: formdatalocal.category, label: data.gender }]
                    //     : []
                    // }


                    value={
                      {"label":formdata?.weekDay?.charAt(0).toUpperCase() + formdata?.weekDay?.slice(1),"value":formdata?.weekDay?.charAt(0).toUpperCase() + formdata?.weekDay?.slice(1)}
                    }
                    // onMenuOpen={() => getcategory()}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={dayOptions}
                    isDisabled
                  />
                </div>
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
                  // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                  handleReactSelectCss("xlarge6", false, true)

                    }
                  //   // onChange={(e) => handlegender(e)}
                    onChange={(e) =>
                      handlechangeselect(e,"timeDetailsId")
                    }
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
                  onMenuOpen={()=>gettimemasterlist()}
                  value= {getvalues(timeoptions,"timeDetailsId")}
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                    options={timeoptions}
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
                  isDisabled
                    styles={
                  //     mandatoryData.includes("planDuration") &&
                  //       !formdata?.planDuration
                  //       ? handleReactSelectCss("xlarge1", true, true):
                  // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)

                  handleReactSelectCss("xlarge6", false, false,false,false,true)
                    }
                
                    // onChange={(e) =>
                    //   handlechangeselect(e,"classMasterId")
                    // }
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
                  value={getvalues(options,"classMasterId")}
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                    options={options}
                />
              
              </div>
            </div>
  


          </div>
          <div class="ml-4 md:flex mt-6 justify-end">
              <div class="md:w-[60%] sm:w-[40%] flex gap-3">
              <button
                  class="lg:w-32 sm:w-20 sm:p-1 lg:p-2 px-4 text-center bg-gray-900 text-white text-lg text-center font-semibold border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-lg hover:bg-gray-800"
                    onClick={() => nav("/portal/classes")}
                >
                  Back 
              
                </button>
             
                <button
                  class="lg:w-44 sm:w-20 p-2 px-4 bg-gray-900  text-lg text-white font-semibold  border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-lg hover:bg-gray-800"
                    onClick={() =>{setstri("cancelclass") ;updateapi("cancelclass")}}
                >
                  Cancel Class 
                  {flag && stri === "cancelclass" ? (
                    <CircularProgress
                      color="inherit"
                      size={"20px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}
                </button>
                <button
                  class="lg:w-52 sm:w-20 p-2 bg-gray-900 text-center text-lg text-white font-semibold  border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-lg hover:bg-gray-800"
                    onClick={() =>{setstri("cancelnextclass") ;updateapi("cancelnextclass")}}
                >
                  Cancel Next Class 
                  {flag && stri === "cancelnextclass" ? (
                    <CircularProgress
                      color="inherit"
                      size={"20px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}
                </button>
                <button
                  class={`lg:w-36 sm:w-20 md:w-32 p-2 ${updateflag && formdata.timeDetailsId!==formtimeid ? "bg-gray-900":"bg-gray-900 pointer-events-none opacity-60"}  text-center text-lg text-white font-semibold  px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-lg hover:bg-gray-800`}
                    onClick={() =>{setstri("update") ;updateapi("update")}}
                >
                  Update 
                  {flag && stri ==="update" ? (
                    <CircularProgress
                      color="inherit"
                      size={"20px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}
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
</>
  )
}

export default EditClass