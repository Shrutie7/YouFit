import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_3.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../services/LocalAxiosInstance";
import ClassesAdminOwner from "./ClassesAdminOwner";
const Classes = () => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  const [classtype, setclasstype] = useState("All Classes");

  const [allclasslist,setallclasslist] = useState([]);
  const [myclasslisttrainer,setmyclasslisttrainer] = useState([])

  const classdetailslisturl = "class/list";
  const classdetailstrainerlisturl = "class/list/trainer";
  const classdetailslist = async () => {
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

  };
  const classdetailstrainerlist = async () => {
    try {
      const res = await axiosInstance.post(classdetailstrainerlisturl, {gymId:1});

      if (res.status === 200) {
        if (res.data.status) {

          console.log(res?.data?.data);
          setmyclasslisttrainer([...res?.data?.data?.classListTrainer])
       
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
  useEffect(()=>{
    if(classtype === "All Classes"){
      classdetailslist();
    }
    else{
      classdetailstrainerlist()
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

      {parseInt(loginDetails.roleId) !==1 ? <div className="mx-auto mt-20 h-screen pt-2 p-3">
        <div className="flex ml-1 justify-between">

          <div className="flex ml-1">

         
            <div
              className={`p-2 m-0 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-tl-md border-white border-solid border-2 ${
                classtype === "My Classes" ?"bg-[#38598b]": "bg-[#113f67]"
              }`}
              onClick={() => onClickhandlerclass("my")}
            >
              My Classes
            </div>
  
          <div
            className={`p-2 m-0 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-tr-md border-white border-solid border-2  ${
              classtype === "All Classes" ? "bg-[#38598b]": "bg-[#113f67]"
            }`}
            onClick={() => onClickhandlerclass("all")}
          >
            All Classes
          </div>
          </div>

          {classtype==="My Classes" ? <div
              className={`pt-1 m-1  h-9  cursor-pointer text-center w-60 text-xl font-semibold rounded-lg bg-[#38598b]`}
              onClick={()=>{nav("/portal/classes/classcreate")}}
           
            >
              Create Class
            </div>:<></>}


        </div>

        <div className="">
          <div className="text-2xl font-bold text-white text-center bg-[#113f67] rounded-xl p-2 ">
            Classes For {months[month]} - {year}
          </div>
        </div>

{allclasslist && allclasslist?.map((ele)=>(
    <div>
    <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
    <div className="flex flex-row justify-between">
      <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
        {ele.weekDay?.toString()?.toUpperCase()}
      </div>
      {ele?.classes?.map((subele)=><div className="flex flex-col gap-y-4">
        <div className="flex flex-col pr-6 gap-y-4">
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
        <button
          className="sm:w-24 md:w-36 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-40 bg-gray-300 hover:bg-black hover:text-white"
          onClick={() => nav("/portal/classes/classesbook")}
        >
          Show Classes
        </button>
      </div>)}
    </div>
  </div>
  </div>
  ))
}

        {/* <div> */}
          {/* <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
            <div className="flex flex-row justify-between">
              <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
                MONDAY
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    BOXING 4-5 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    ZUMBA 5-6 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <button
                  className="sm:w-24 md:w-36 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-40 bg-gray-300 hover:bg-black hover:text-white"
                  onClick={() => nav("/portal/classes/classesbook")}
                >
                  Show Classes
                </button>
              </div>
            </div>
          </div> */}

          {/* <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md: min-h-28 sm:min-h-28 sm:p-6 md:p-6 lg:p-8 mt-2 rounded-xl">
            <div className="flex flex-row justify-between">
              <div className="font-extrabold  sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
                TUESDAY
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    BOXING 4-5 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    ZUMBA 5-6 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <button
                  className="sm:w-24 md:w-36 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-40 bg-gray-300 hover:bg-black hover:text-white"
                  onClick={() => nav("/portal/classes/classesbook")}
                >
                  Show Classes
                </button>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>:
      <ClassesAdminOwner/>
      }
    </>
  );
};

export default Classes;
