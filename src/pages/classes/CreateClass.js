import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_3.jpg";
import Select from "react-select";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import axiosInstance from "../../services/LocalAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { Addrowerror } from "../../commonmodules/Addrowerror";


const CreateClass = () => {
  const currentDate = new Date();

  const classesdata = useSelector((e)=>e.classesstore.data.data);

  // let json = {
  //   weekday:"",
  //   classCount:"",
  //   timings:"",
  //   tempTimings:""
  // }
  let [jsondata,setjsondata]=useState([])



  
  console.log(classesdata);
  const [options,setoptions] = useState([]);
  const nav = useNavigate();
  const classmasterlisturl = "class/master/list";
  const timemasterlisturl = "class/time/details/list";
  const classcraeteurl = "class/create";

  const [flag,setflag] = useState(false);
  const loginDetails = useSelector((e)=>e.logindetails.data)


  let formdatajson ={
    
      "classMasterId":"",
      "timeDetailsId":"", 
      "weekDay":""
  
  }
  const [mandatoryData, setMandatoryData] = useState([]);

  const lableMandatoryData = [
    "classMasterId",
    "timeDetailsId", 
    "weekDay"

  ];
  let [formdata,setformdata] = useState({...formdatajson});

  const handlechangeselect = (e,name,opt)=>{

    let l = {...formdata};

    if(name === "classMasterId"){
      l.classMasterId = e.value;
    }
    if(name === "timeDetailsId"){
      l.timeDetailsId = e.value;
    }
    if(name === "weekDay"){
      l.weekDay = e.label;
    }

    setformdata({...l})


  }

  const [timeoptions,settimeoptions] = useState([]);

  const gettimemasterlist = async () => {
    try {
      const res = await axiosInstance.get(timemasterlisturl);

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.timeList.map((d) => ({
            value: d.timeDetailsId,
            label: d.timings
          }));

          let arr7 = []
          let arr8 = [];
          let arr = [];
          let json = {};
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
            console.log((formdata?.weekDay?.charAt(0)?.toLowerCase() + formdata?.weekDay?.slice(1)) ,"jkjhkj", ele?.weekday)
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

  const getoptions = ()=>{
let m1 = classesdata?.filter((ele)=>parseInt(ele.classCount)>=2);
console.log(m1);
let arr2 = []
m1.forEach((ele)=>{
  arr2.push(ele.weekDay)
})
console.log(arr2);
let arr7 = []
dayOptions.forEach((subele)=>{
  if(!arr2.includes(subele.label?.charAt(0)?.toLowerCase() + subele.label?.slice(1)))
  {
    arr7.push({label:subele.label,value:subele.value })
  }

})

console.log(arr7)


return arr7;





  }
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
    return `${day} ${months[month]} ${year}`;
  };
    const formatDate1 = date => {
    const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const month = (date.getMonth());

    const year = date.getFullYear().toString().substring(2,4);
    return `${day} ${months[month]} ${year}`;
  };


const createclassapi = async()=>{
  let res = Addrowerror(lableMandatoryData, formdata);

  if (res?.length > 0) {
    setMandatoryData([...res]);

  } else{

  


  setflag(true);
const localjson = {};


    localjson.classMasterId = formdata.classMasterId
    localjson.startDate=formatDate1(startOfMonth)
    localjson.endDate=formatDate1(endOfMonth)
    localjson.timeDetailsId = formdata?.timeDetailsId
    localjson.trainerId=parseInt(loginDetails?.userId)
    localjson.gymId=parseInt(loginDetails?.gymId)
    localjson.weekDay=formdata?.weekDay?.toString()?.toLowerCase()

    try {
      const res = await axiosInstance.post(classcraeteurl,localjson);

      if (res.status === 200) {
        if (res.data.status) {
       
          console.log(res);

          setformdata({...formdatajson})
          toast(`Class Created Successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              nav("/portal/classes");
              setformdata({...formdatajson});
              setMandatoryData([])
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
  }

}


  useEffect(()=>{
    getclassmasterlist();
  
      // gettimemasterlist();
 

    let arr = [];
    let json = {};
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


setjsondata([...arr])



  },[])
  console.log(jsondata)





  return (
    <>
      {/* <Header title="Classes" image={HeaderImage}></Header> */}

      {/* <div class="container mx-auto max-w-3xl mt-4 h-screen pt-3" >

<div className='lg:bg-gray-200 sm:bg-gray-200 md:bg-gray-200 h-[85%] overflow-x-hidden overflow-y-hidden bg-gray-200'>


</div>
</div> */}

      <div class="flex mt-28">
        <div class="bg-gray-100 w-11/12 mx-auto max-w-7xl bg-white py-10 px-12 lg:px-12 shadow-2xl mb-12">
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
                      mandatoryData.includes("weekDay") &&
                      !formdata?.weekDay
                      ? handleReactSelectCss("xlarge6", true, true)
                      : handleReactSelectCss("xlarge6", false, true)
                    //   mandatoryData.includes("day") &&
                    //     formdata?.categoryId?.length === 0
                    //     ? handleReactSelectCss("xlarge4", true, true):
                        // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                        // handleReactSelectCss("xlarge6", false, true)
                    }
                    onChange={(e) => handlechangeselect(e,"weekDay")}
                    // value={
                    //   formdatalocal?.categoryId
                    //     ? [{ value: formdatalocal.category, label: data.gender }]
                    //     : []
                    // }

                    // onMenuOpen={() => getcategory()}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={getoptions()}
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
                      mandatoryData.includes("timeDetailsId") &&
                      !formdata?.timeDetailsId
                      ? handleReactSelectCss("xlarge6", true, true)
                      : handleReactSelectCss("xlarge6", false, true)
                  //     mandatoryData.includes("planDuration") &&
                  //       !formdata?.planDuration
                  //       ? handleReactSelectCss("xlarge1", true, true):
                  // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)
                  // handleReactSelectCss("xlarge6", false, true)

                    }
                    isDisabled = {formdata.weekDay===""}
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
                    styles={
                      mandatoryData.includes("classMasterId") &&
                      !formdata?.classMasterId
                      ? handleReactSelectCss("xlarge6", true, true)
                      : handleReactSelectCss("xlarge6", false, true)
                  //     mandatoryData.includes("planDuration") &&
                  //       !formdata?.planDuration
                  //       ? handleReactSelectCss("xlarge1", true, true):
                  // window.innerWidth>1500 ? handleReactSelectCss("xlarge6", false, true):handleReactSelectCss("xlarge5", false, true)

                  // handleReactSelectCss("xlarge6", false, true)
                    }
                  //   // onChange={(e) => handlegender(e)}
                    onChange={(e) =>
                      handlechangeselect(e,"classMasterId")
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
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                    options={options}
                />
              
              </div>
            </div>

            <div class="-mx-3 md:flex mt-2">
              <div class="md:w-full px-3">
                <button
                  class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
                    onClick={() => createclassapi()}
                >
                  Create Class &nbsp;&nbsp;&nbsp;
                  {flag ? (
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
          <button
            onClick={() => nav("/portal/classes")}
            class="md:w-1/5 lg:-ml-11 text-black italic font-bold border-b-4 hover:border-b-2 hover:text-blue-600 hover:underline border-gray-500 hover:border-gray-100 rounded-lg"
          >
            Back
          </button>
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
    </>
  );
};

export default CreateClass;
