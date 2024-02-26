import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/LocalAxiosInstance';
import { addloc } from '../../store/location';
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from '@material-ui/core';
import Card from '../../UI/Card';
import noavatar from "../../assets/person/noAvatar.png"
import LoadingPopup from '../../commonmodules/Loading';

const ClassesBook = () => {

  const classleaveurl = "class/user/leave";
  const classbookurl = "class/user/mapping";
  const classuserdatalisturl ="class/user/data/list";
  const classuserlisturl = "class/users/list";
  let [loading, setLoading] = useState(false);
 let [allclassesdata,setallclassesdata] = useState([])
 let [userclasslist,setuserclasslist] = useState([])
 const [classmasterid,setclassmasterid] =useState()
const [id,setid]=useState();
const [leavemodal,setleavemodal] = useState(false);

  const [tab,settab] = useState("bookclasses");
const nav = useNavigate();
const dispatch = useDispatch()
const [flag,setflag] = useState(false)
const loginDetails = useSelector((e)=>e.logindetails.data) 
const loc = useSelector((e)=>e.location.state);
const [tabclass,settabclass] = useState(false);
console.log(loc.state.classes);

const bookclassapi = async(classdetailsid)=>{

  setid(classdetailsid);
  setflag(true);
const localjson = {};

localjson.userId = loginDetails?.userId;
localjson.classDetailsId = classdetailsid

  

    try {
      const res = await axiosInstance.post(classbookurl,localjson);

      if (res.status === 200) {
        if (res.data.status) {
      
          toast(res?.data?.message, {
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

const classdetailsuserlist = async() =>{

  const localjson = {};

  localjson.userId = loginDetails?.userId
  try {
    const res = await axiosInstance.post(classuserdatalisturl,localjson);

    if (res.status === 200) {
      if (res.data.status) {
    
        console.log(res?.data?.data)
        
        setuserclasslist([...res?.data?.data?.classList])

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
const classesuserlistapi = async(id) =>{
  setLoading(true)
  const localjson = {};

  localjson.classDetailsId = id
  try {
    const res = await axiosInstance.post(classuserlisturl,localjson);

    if (res.status === 200) {
      if (res.data.status) {
    
        console.log(res?.data?.data)
setallclassesdata(res?.data?.data?.usersList)
       
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

}

useEffect(()=>{
  if(tab === "joinedclasses"){
    classdetailsuserlist()
  }

},[tab])

  return (

    <div class="container mx-auto max-w-3xl mt-20 h-screen pt-3" >
   <div className='lg:bg-gray-200 sm:bg-gray-200 md:bg-gray-200 h-[90%] overflow-x-hidden overflow-y-hidden bg-gray-200'>

   <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-6">
     {/* {parseInt(loginDetails?.roleId) !== 1 ?  <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" class= {`${tab==="profileinfo" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("profileinfo")}>Profile Info</a></li>:<></>} */}
      <li class="mr-8 hover:text-gray-900"><a href='#_' class={`${tab==="bookclasses" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold hover:cursor-pointer`}  onClick={()=>{settab("bookclasses");settabclass(false)}}>{parseInt(loginDetails?.roleId===4)?"Book Classes":"Edit Classes"}</a></li>
      {parseInt(loginDetails?.roleId) === 4 ? <li class="mr-8 hover:text-gray-900"><a href='#_' class={`${tab==="joinedclasses" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold hover:cursor-pointer`}  onClick={()=>settab("joinedclasses")}>Joined Classes</a></li>:<></>}
     {tabclass? <li class="mr-8 hover:text-gray-900"><a href='#_' class={`${tab==="allclasses" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold hover:cursor-pointer`}  onClick={()=>settab("allclasses")}> Users Joined </a></li>:<></>}
    </ul>

   {tab === "bookclasses" ? 
   <div class="w-full bg-white mx-auto mt-1 flex flex-col h-[79.5%] overflow-y-auto rounded-b-none">

   <div className='text-black text-3xl font-bold italic p-2 text-center pt-3'>Classes For {loc?.state?.weekday}</div> 
    {loc.state.classes && loc.state.classes.map((ele)=>(
      <div className='p-2'>
    <div className="flex flex-col bg-gray-200 w-full max-h-40 lg:min-h-28 md:min-h-20 sm:min-h-20 sm:p-3 md:p-3 lg:p-4 rounded-xl mt-2 p-3">
    <div className="flex flex-row  max-h-44 lg:min-h-28 md:min-h-20 sm:min-h-20  items-center justify-center">
      <div className="flex flex-col  gap-2 w-full items-center justify-center">
      <div className="flex flex-row justify-between w-full items-center mt-3">
        <div className="flex flex-col gap-y-3">
          <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
           {ele?.className} {ele?.timings}
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="sm:text-base lg:text-lg font-semibold text-black">
              INSTRUCTOR: {ele?.trainerDetails?.trainerName}
            </div>
            {ele?.trainerDetails?.rating!==0 ?<div className="sm:text-base lg:text-lg font-semibold text-black">
              RATING: {ele?.trainerDetails?.rating}
            </div>:<></>}

            <div className='italic text-sm text-black cursor-pointer hover:underline' onClick={()=>{settabclass(true);settab("allclasses");classesuserlistapi(ele?.classDetailsId)}}>Show All users in this class</div>
          </div>
        </div>
        {parseInt(loginDetails?.roleId) === 3 ?<button
          className="sm:w-28 md:w-44 sm:text-md m-1 p-2  border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-gray-300 hover:bg-black hover:text-white"
          onClick={() => {nav("/portal/classes/editClass");dispatch(addloc({
            state:{
              classDetailsId:ele?.classDetailsId
            }
          }))}}
        >
         Edit Class
        </button>
        
        :
        <button
        className="sm:w-28 md:w-44 sm:text-md m-1 p-2  border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-gray-300 hover:bg-black hover:text-white"
        onClick={() => {bookclassapi(ele?.classDetailsId)}}
      >
       Book Class
       {flag && ele?.classDetailsId === id ? (
                    <CircularProgress
                      color="inherit"
                      size={"20px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}
      </button>
        }
    
      </div>

      </div>



  </div>
  </div>
  </div>

   ))}


</div>:
tab==="allclasses"?
<div className='w-full bg-white mx-auto mt-1 flex flex-col h-[79.5%] overflow-y-auto rounded-b-none'>
<div className='mt-4'>
{console.log(allclassesdata)}
  {allclassesdata.length > 0 ? 
    allclassesdata.map((ele)=>(
    <Card className="lg:w-[20%] h-[50%] sm:w-[40%] m-4 p-4">
          <div className="testimonailstoavatar">
          {console.log(ele)}
            <img src={ele.image ? "data:image/png;base64," + ele?.image:noavatar} alt="" />
          </div>
          <div className="flex items-center justify-center mr-20 w-full text-lg font-semibold font-sans">{ele?.userName}</div>
          <p className="testimonailstoquote"></p>
          <div className="text-base"></div>
          {/* <small className="testimonailstotitle">{job}</small> */}
        </Card>
        
        
        
        
        )):<div className="text-black text-center text-lg block italic text-indigo-600">No Users have joined the class :(</div>
  }
  </div>
</div>
:  <div class="w-full bg-white mx-auto mt-1 flex flex-col h-[79.5%] overflow-y-auto rounded-b-none">

{/* <div className='text-black text-3xl font-bold italic p-2 text-center pt-3'>Classes For {loc?.state?.weekday}</div>  */}
 {userclasslist && userclasslist.map((ele)=>(
  <div className='p-4'>
      <div className="flex flex-col  bg-gray-100 w-full max-h-96 lg:min-h-36 md:min-h-32 sm:min-h-32 sm:p-4 md:p-4 lg:p-4 mt-2 rounded-xl">
      <div className="flex flex-row justify-between">
        <div className="font-extrabold font-oswald sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
          {ele.weekDay?.toString()?.toUpperCase()}
        </div>
        <div className="flex flex-col gap-3">
  
        {ele?.classes?.slice(0,2)?.map((subele)=>(<div className="flex flex-col gap-y-4">
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
            onClick={() => {setclassmasterid(subele?.classDetailsId);setleavemodal(true)}}
          >
           Leave Class
          </button>}
      
        </div>))}
        {/* <div className="flex gap-x-4">
          {parseInt(loginDetails?.roleId) === 4 ?<button
            className="sm:w-28 md:w-44 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-44 bg-red-500 hover:bg-red-400 hover:text-white"
            onClick={() => handleleave()}
          >
           Leave Class
          </button>:<></>}
          </div> */}
        </div>
  
      </div>
    </div>
    </div>

))}


</div>}





<div class="p-7 pt-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200 ">
        <p class="float-left text-xs text-gray-500 tracking-tight mt-1">Changed your mind go back and review more classes</p>
        {/* <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer mb-2" value="Save"/> */}

        <button className='sm:-mt-4 md:-mt-4 bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer -mt-4 hover:bg-indigo-400' onClick={()=>nav("/portal/classes")}>Back</button>
      </div>
</div>
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
                  onClick={() => handleleave(classmasterid)}
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
            {loading && (
        <LoadingPopup state={loading} message="Loading... Please Wait" />
      )}
    </div>
    




  )
}

export default ClassesBook