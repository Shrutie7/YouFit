import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_3.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/LocalAxiosInstance";
import ClassesAdminOwner from "./ClassesAdminOwner";
import { addloc } from '../../store/location';
import LoadingPopup from "../../commonmodules/Loading";
import { addclassdata } from "../../store/classesstore";
const Classes = () => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  const [classtype, setclasstype] = useState("All Classes");
const dispatch = useDispatch();
let [loading, setLoading] = useState(false);
  const [allclasslist,setallclasslist] = useState([]);
  const [myclasslisttrainer,setmyclasslisttrainer] = useState([]);
  const [userclasslist,setuserclasslist] = useState([])
const [leavemodal,setleavemodal] = useState(false);
const [userClassMappingId,setuserClassMappingId] = useState()
  const classdetailslisturl = "class/list";
  const classdetailstrainerlisturl = "class/list/trainer";
  const classdetailsuserlisturl = "class/user/data/list"
  const classleaveurl = "class/user/leave";
  const classdetailslist = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(classdetailslisturl, {userId:loginDetails?.userId,gymId:loginDetails?.gymId});

      if (res.status === 200) {
        if (res.data.status) {

          console.log(res?.data?.data)
          setallclasslist([...res?.data?.data?.classList])
       
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
    setLoading(false)
  };
  const classdetailsuserlist = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(classdetailsuserlisturl, {userId:loginDetails?.userId});

      if (res.status === 200) {
        if (res.data.status) {

          console.log(res?.data?.data)
          setuserclasslist([...res?.data?.data?.classList])
       
        } else {
          setuserclasslist([])
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
    setLoading(false)
  };
  const classdetailstrainerlist = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(classdetailstrainerlisturl, {trainerId:loginDetails?.userId});

      if (res.status === 200) {
        if (res.data.status) {

          console.log(res?.data?.data);
          setmyclasslisttrainer([...res?.data?.data?.classListTrainer]);
          dispatch(addclassdata({data : [...res?.data?.data?.classListTrainer]}));
       
        } else {
          setmyclasslisttrainer([]);
          dispatch(addclassdata({data:[]}))
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
setLoading(false);
  };

  const handleleave = async(mappingid)=>{
    
    try {
      const res = await axiosInstance.post(classleaveurl, {userClassMappingId:mappingid,userId:loginDetails?.userId});

      if (res.status === 200) {
        if (res.data.status) {

         setleavemodal(false);
         classdetailsuserlist();
         
       
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
  }
  useEffect(()=>{
    if(classtype === "All Classes"){
      classdetailslist();
    }
    if(classtype === "My Classes" && parseInt(loginDetails?.roleId) === 3){
      classdetailstrainerlist()
    }
    if(classtype === "My Classes" && parseInt(loginDetails?.roleId) === 4){
      classdetailsuserlist()
    }

  },[classtype])



  const onClickhandlerclass = (name) => {
    let str = "";
    if (name === "all") {
      str = "All Classes";
    }
    if (name === "my") {
      str = "My Classes";
    }
    // if(name === "create"){
    //   str = "Create Class";
    // }

    console.log(str);
    setclasstype(str);
  };
  const nav = useNavigate();
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
  useEffect(() => {
    setclasstype("All Classes");

    console.log(classtype);
  }, []);
  return (
    <>
      {/* <Header title="Classes" image={HeaderImage}></Header> */}

      {parseInt(loginDetails.roleId) !==1 ? <div className="mx-auto mt-20 h-screen pt-2 p-8">
        <div className="flex ml-1 justify-between">

          <div className="flex ml-1">

         
            <div
              className={`p-2 m-0 h-12 cursor-pointer text-center sm:w-36 md:w-40 lg:w-80 text-xl font-semibold leading-8 rounded-tl-md border-white border-solid border-2 ${
                classtype === "My Classes" ?"bg-[#38598b]": "bg-[#113f67]"
              }`}
              onClick={() => onClickhandlerclass("my")}
            >
              My Classes
            </div>
  
          <div
            className={`p-2 m-0 h-12 cursor-pointer text-center sm:w-36 md:w-40 lg:w-80 text-xl font-semibold leading-8 rounded-tr-md border-white border-solid border-2  ${
              classtype === "All Classes" ? "bg-[#38598b]": "bg-[#113f67]"
            }`}
            onClick={() => onClickhandlerclass("all")}
          >
            All Classes
          </div>
          </div>

          {classtype==="My Classes" && parseInt(loginDetails?.roleId) === 3 ? <div
              className={`pt-1 m-1  h-9  cursor-pointer text-center sm:w-32 md:40 lg:w-60 text-xl font-semibold rounded-lg bg-[#38598b]`}
              onClick={()=>{nav("/portal/classes/classcreate")}}
           
            >
              Create Class
            </div>:<></>}


        </div>

        <div className="">
          <div className="text-2xl font-bold text-white text-center bg-[#113f67] rounded-xl p-2 sticky ">
            Classes For {months[month]} - {year}
          </div>
        </div>

        {console.log(allclasslist?.slice(0,1))}

{classtype === "All Classes"?
<div className="h-[86%] overflow-auto">
{allclasslist && allclasslist?.map((ele)=>(
    <div>
    <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
    <div className="flex flex-row justify-between">
      <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
        {ele.weekDay?.toString()?.toUpperCase()}
      </div>
      <div className="flex flex-col gap-3">

      {ele?.classes?.slice(0,2)?.map((subele)=>(<div className="flex flex-col gap-y-4  w-[30rem]">
        <div className="flex flex-col pr-6 gap-y-3">
          <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
           {subele?.className} {subele?.timings}
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="sm:text-base lg:text-lg font-semibold text-black">
              INSTRUCTOR: {subele?.trainerDetails?.trainerName}
            </div>
            {subele?.trainerDetails?.rating!==0 ?<div className="sm:text-base lg:text-lg font-semibold text-black">
              RATING: {subele?.trainerDetails?.rating}
            </div>:<></>}
            {subele?.tempChangeFlag ? <div>
<p className="italic text-sm text-black"> This class is temporarily changed from {subele?.timings} to {subele?.tempTimings}  </p>
            </div>:
          
            <></>}
            {subele?.tempCancelFlag ? <div>
<p className="italic text-sm text-black"> Next Class is temporarily cancelled </p> 
            </div>:
          
            <></>}
          </div>
        </div>
    
      </div>))}
      <div className="flex gap-x-4">

      <button
          className="sm:w-28 md:w-44 sm:text-md m-1 p-2  border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-gray-300 hover:bg-black hover:text-white"
          onClick={() => {nav("/portal/classes/classesbook");dispatch(addloc({
            state:{
              classes : ele?.classes,
              weekday: ele.weekDay?.charAt(0)?.toUpperCase() + ele.weekDay?.slice(1),
              
            }
          }))}}
        >
          Show All Classes
        </button>


        </div>
      </div>

    </div>
  </div>
  </div>
  ))}</div>:(
   parseInt(loginDetails?.roleId) === 3  ? 
   <div className="h-[86%] overflow-auto">
   {myclasslisttrainer && myclasslisttrainer.map((ele)=>(

    <div className="flex flex-col border border-solid border-black bg-gray-100 w-full lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
    <div className="flex flex-row justify-between">
      <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
        {ele.weekDay?.toString()?.toUpperCase()}
      </div>
      <div className="flex flex-col gap-3">

      {ele?.classes?.slice(0,2)?.map((subele)=>(<div className="flex flex-col gap-y-4  w-[30rem]">
        <div className="flex flex-col pr-6 gap-y-3">
          <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
           {subele?.className} {subele?.timings}
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="sm:text-base lg:text-lg font-semibold text-black">
              INSTRUCTOR: {subele?.trainerDetails?.trainerName}
            </div>
            {subele?.trainerDetails?.rating!==0 ?<div className="sm:text-base lg:text-lg font-semibold text-black">
              RATING: {subele?.trainerDetails?.rating}
            </div>:<></>}

            {subele?.tempChangeFlag ? <div>
<p className="italic text-sm text-black"> This class is temporarily changed from {subele?.timings} to {subele?.tempTimings} </p>
            </div>:
          
            <></>}
            {subele?.tempCancelFlag ? <div>
<p className="italic text-sm text-black"> Next Class is temporarily cancelled </p> 
            </div>:
          
            <></>}


          </div>
        </div>

        <button
          className={`sm:w-28 md:w-44 sm:text-md m-1 p-2 border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-gray-300 hover:bg-black hover:text-white ${subele?.tempChangeFlag || subele?.tempCancelFlag ? "pointer-events-none opacity-50":""}`}
          title={subele?.tempCancelFlag ? "Next Class is temporarily cancelled": subele?.tempChangeFlag ? "Class Timings are temporarily changed":""}
          onClick={() => {nav("/portal/classes/editClass");dispatch(addloc({
            state:{
              classDetailsId:subele?.classDetailsId
            }
          }))}}
        >
         Edit Class
        </button>
    
      </div>))}

      </div>

    </div>
  </div>
 


   ))
        }</div>:(
    userclasslist && userclasslist.map((ele)=>(
      <div>
      <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
      <div className="flex flex-row justify-between">
        <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
          {ele.weekDay?.toString()?.toUpperCase()}
        </div>
        <div className="flex flex-col gap-3">
  
        {ele?.classes?.slice(0,2)?.map((subele)=>(<div className="flex flex-col gap-y-4  w-[30rem]">
          <div className="flex flex-col pr-6 gap-y-3">
            <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
             {subele?.className} {subele?.timings}
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="sm:text-base lg:text-lg font-semibold text-black">
                INSTRUCTOR: {subele?.trainerDetails?.trainerName}
              </div>
              {subele?.trainerDetails?.rating!==0 ?<div className="sm:text-base lg:text-lg font-semibold text-black">
                RATING: {subele?.trainerDetails?.rating}
              </div>:<></>}
            </div>
          </div>
  
          {parseInt(loginDetails?.roleId) === 3 ?<button
            className="sm:w-28 md:w-44 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-gray-300 hover:bg-black hover:text-white"
            onClick={() => {nav("/portal/classes/editClass");dispatch(addloc({
              state:{
                classDetailsId:subele?.classDetailsId
              }
            }))}}
          >
           Edit Class
          </button>:<button
            className="sm:w-28 md:w-44 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-red-500 hover:bg-red-400 hover:text-white"
            onClick={() => {setuserClassMappingId(subele?.userClassMappingId);setleavemodal(true)}}
          >
           Leave Class
          </button>}
      
        </div>))}
 
        </div>
  
      </div>
    </div>
    </div>
  
  
     ))
  )
)
}

     
      </div>:
      <ClassesAdminOwner/>
      }


{leavemodal ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-black opacity-80">
              <button
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  onClick={() => setleavemodal(false)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to leave this Class?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => handleleave(userClassMappingId)}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  onClick={() => setleavemodal(false)}
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}



      {loading && (
        <LoadingPopup state={loading} message="Loading... Please Wait" />
      )}
    </>
  );
};

export default Classes;
