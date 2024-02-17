import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../../services/LocalAxiosInstance";
import { Addrowerror } from "../../commonmodules/Addrowerror";
import Errmsg from "../../data/Errormsg.json";
import eyeimgon from "../../icons/eye.png";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import Select from "react-select";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import PencilIcon from '../../commonmodules/PencilIcon';
import ModalDp from '../../commonmodules/ModalDp';
import { addLoginReducer } from '../../store/LoginDetails';


const Setting = () => {
  const updateuserurl = "/users/update";
  const updatepasswordurl = "/users/updatePassword";
  let stateurl = "location/state";
  let cityurl = "location/city";
  let locationaddressurl = "location/address";
  let gymaddressurl = "location/gymaddress";  
  const avatarUrl = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);


  let dispatch = useDispatch();

  const logindetailsurl = "users/getuser";

  const loginDetails = useSelector((e)=>e.logindetails.data);

  const [options2, setoptions2] = useState([]);
  const [options3, setoptions3] = useState([]);
  const [options4, setoptions4] = useState([]);
  const [options5, setoptions5] = useState([]);
  const [options6, setoptions6] = useState([]);
  const [tab,settab] = useState("profileinfo");
  const [showeye, setShoweye] = useState(false);
  const [showeye2, setShoweye2] = useState(false);
  const [showeye3, setShoweye3] = useState(false);
  const [mandatoryData, setMandatoryData] = useState([]);
  const [flag, setflag] = useState(false);
  const passwordjson = {
    currentPassword:"",
    newPassword:"",
    confirmNewPassword:""
  }

  const userjson = {
    "firstName":"",
    "lastName":"",
    "userName":""
  }

  const [userdetails,setuserdetails] = useState({...loginDetails});
  const [passworddata,setpassworddata] = useState({...passwordjson});
  const [err, seterr] = useState({ message: "" });
  let [errcode, seterrcode] = useState("");
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
  const handleShoweye = () => {
    setShoweye(!showeye);
  };
  const handleShoweye2 = () => {
    setShoweye2(!showeye2);
  };
  const handleShoweye3 = () => {
    setShoweye3(!showeye3);
  };

  const updateAvatar = (imgSrc) => {
    let l ={...userdetails};
   
    avatarUrl.current = imgSrc;
    console.log(imgSrc);
    console.log(avatarUrl.current.slice(avatarUrl.current?.toString()?.indexOf(",")+1))
   
    l.image = avatarUrl.current.slice(avatarUrl.current?.toString()?.indexOf(",")+1)
    setuserdetails({...l});

  };

  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/  ;

  const lableMandatoryData = [
    "currentPassword",
    "newPassword",
    "confirmNewPassword",
  ];

  const lableMandatoryData1 = [
    "firstName",
    "userName",
    "lastName",
  ];


  const onchangehandler = (e,name)=>{
    let l = {...passworddata};
    l[name] = e.target.value;
    setpassworddata({...l})

  }

  const onchangehandler2 = (e,name)=>{
    console.log(e,name)
    let l = {...userdetails};
    l[name] = e.target.value;
    console.log(l)
    setuserdetails({...l})

  }


const logindetailsapi = async (emailId) => {
  // setloaded(true)
  const res = await axiosInstance.post(logindetailsurl, {
    emailId: emailId
  });

  try {
    if (res.status === 200) {
      if (res.data.status) {
        let l = res.data.data;

        console.log(l)
        
        dispatch(addLoginReducer({ ...res.data.data }));
        
      } else {
   
        // const l = { ...err };
        // // setloaded(false)
        // setshow(true);
        // setnavpath("/");
        // setmodalType("errormodal");
        // l.message = res.data.message;
        // seterrcode(l.message);
        // setlogout(true);
      
      }
    } else if (res?.response.status === 401) {
      // seterrcode(Errmsg["err002"]);

      // setshow(true);
      // setlogout(true);
      // setnavpath("/");

      // setmodalType("errormodal");
    } else {
      // seterrcode(Errmsg["err001"]);
      // setlogout(true);
      // setshow(true);
      // setmodalType("errormodal");
    }
  } catch (err) {
  
    // seterrcode(Errmsg["err001"]);
    // setlogout(true);
    // setshow(true);
    // setmodalType("errormodal");
  }
};

  const getvalue = (name,opt) =>{

   console.log(userdetails.locationDetails?.[name],opt)

   let m =  opt.filter((m)=>m.label === userdetails.locationDetails?.[name]);

   console.log(m,userdetails.locationDetails?.[name])
    m = m.map((d)=>({"value":d.value,"label":d.label}));

    console.log(m)
    return m 
  }

  const getvalue1 = ()=>{

    let m = options5.filter((m)=>m.extrakey === loginDetails?.gymId)
    m = m.map((d)=>({"value":d.value,"label":d.label}));

    console.log(m)
    return m ; 

  }

  function handlegymaddress(e) {
    let l = { ...locationdata };

    let l3 = {...userdetails}
    

    l3.gymId = e.value;

    // l.ownerId = e.value;
    // l.gymName=e.label;
 

    // let l2 = {...data}
    // l2.parentUserId=e.value;
    
    // l2.gymId = e.extrakey;
    // setData({...l2})


    setuserdetails({...l3})
    

    setlocationdata({ ...l });




  }

  const updateuserapi = async () => {

    let localjson = {};
    localjson.userId = loginDetails?.userId;
    localjson.userName = userdetails?.userName;
    localjson.firstName = userdetails?.firstName;
    localjson.lastName = userdetails?.lastName;
    localjson.gender = loginDetails?.gender;
    localjson.emailId = loginDetails?.emailId;
    localjson.parentUserId = loginDetails?.parentUserId;
    localjson.locationId = loginDetails?.locationId;
    localjson.activeFlag = true;
    localjson.gymId = loginDetails?.gymId;
    localjson.image = userdetails?.image;

    console.log(localjson);

    try {
      const res = await axiosInstance.post(updateuserurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {

          toast(`${loginDetails.firstName} your ${res?.data?.message}` , {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              // nav("/portal");
              logindetailsapi(loginDetails?.emailId);

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
  };


  const updatepasswordapi = async () => {

    let localjson = {};

    localjson.userId = loginDetails?.userId;
    localjson.emailId = loginDetails?.emailId;
    localjson.currentPassword = passworddata.currentPassword;
    localjson.newPassword = passworddata.newPassword;
    localjson.confirmNewPassword = passworddata.confirmNewPassword;
    setflag(true);

    try {
      const res = await axiosInstance.post(updatepasswordurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {



          setpassworddata({...passwordjson});
          toast(`${loginDetails.firstName} your ${res?.data?.message}` , {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              // nav("/portal");
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


  const savefunction = ()=>{
    if(tab==="profileinfo")
    {
      let res1 = Addrowerror(lableMandatoryData1, userdetails);
      if (res1?.length > 0) {
          setMandatoryData([...res1]);
        }
        else{
          updateuserapi();

        }
    }
    if(tab === "passwordupdate")
{

  let res = Addrowerror(lableMandatoryData, passworddata);
  if (res?.length > 0) {
      setMandatoryData([...res]);
    }
   else if(passworddata.confirmNewPassword !==passworddata.newPassword){
    console.log("ppp")
    const l = { ...err };
    l.message = Errmsg["usrwrng01"];
    seterrcode(l.message);
  }
  else if(passworddata?.currentPassword === passworddata?.newPassword){

    seterrcode(Errmsg["wrng027"])
  }
  else if(!re.test(passworddata.newPassword)){
    console.log("ghsvcgh")
    seterrcode(Errmsg["wrng018"])
   }
     else{
       seterrcode("")
    updatepasswordapi()

  }
}

if(tab==="planupdate"){

}
  }


  const getGymAddress = async () => {
    try {
      const res = await axiosInstance.post(gymaddressurl, { locationId:loginDetails?.locationDetails?.locationId});

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

  const getcity = async () => {
    try {
      const res = await axiosInstance.post(cityurl, { state: userdetails?.locationDetails?.state });

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
      const res = await axiosInstance.post(locationaddressurl, { state: userdetails?.locationDetails?.state,city:userdetails?.locationDetails?.city });

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

  useEffect(() => {

    getstate();
    getcity();
    getlocation();
    getGymAddress();

    


  }, []);
  function handlelocation(e, name) {
    let l = { ...locationdata };
    let l3 = {...userdetails};


    if(name === "state"){
      l3.locationDetails.state = e.value
    }
    if(name === "city"){
      l3.locationDetails.city = e.value
    }
    if(name === "location"){
      l3.locationDetails.location = e.label;
      l3.locationDetails.locationId= e.value;
    }
 
    console.log(l3)

    setuserdetails({...l3})
    // l[name] = e.value;
    // if(name==="location"){
    //   l[name] = e.label;
    //   l.locationId = e.value;
    // }
    // setlocationdata({ ...l });
  }


  // const [base64Image, setBase64Image] = useState('');

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       // The result property contains the data URL as a base64 encoded string
  //       const base64String = reader.result;
  //       setBase64Image(base64String);
  //     };

  //     // Read the image file as a data URL
  //     reader.readAsDataURL(file);
  //   }
  // };
  // <input type="file" onChange={handleFileChange} />




  // console.log(avatarUrl.current?.toString()?.slice(avatarUrl.current?.toString()?.indexOf(",")+1));
  return (
    

  <div class="container mx-auto max-w-3xl mt-20 h-screen pt-3" >
    {/* <h1 class="text-3xl font-bold font-sans text-white px-6 md:px-0">Account Settings</h1> */}
    <div className='lg:bg-gray-200 sm:bg-gray-200 md:bg-gray-200 h-[85%] overflow-x-hidden overflow-y-hidden bg-gray-200'>
    <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-6">
      <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#_" class= {`${tab==="profileinfo" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("profileinfo")}>Profile Info</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="passwordupdate" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("passwordupdate")}>Password Update</a></li>
      <li class="mr-8 hover:text-gray-900"><a href="#_" class={`${tab==="planupdate" ? "underline":"no-underline"} py-4 inline-block text-black text-base font-sans font-semibold`} onClick={()=>settab("planupdate")}>Plan Details</a></li>
    </ul>
     <div class="w-full bg-white rounded-lg mx-auto mt-8 flex h-[72%] overflow-y-auto rounded-b-none">
        <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
          <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">{tab==="profileinfo" ?"Profile Info":tab==="passwordupdate" ? "Password Update":"Plan Details"}</h2>
          <p class="text-xs text-gray-500">{tab==="profileinfo" ?"Update your basic profile information such as Email Address, Name, and Image.":tab==="passwordupdate" ? "Update your Password":"Update your Plan to switch to a newer and better Plan"}</p>
        </div>
        {tab==="profileinfo"?<div className='flex'><div class="md:w-5/6 w-full px-8 pt-6 pb-8 mb-4  flex flex-col">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">First Name</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-gray-700" type="text" value="" name="name"/> */}
          <input type="text" placeholder='First Name' class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" value={userdetails?.firstName} onChange={(e)=>onchangehandler2(e,"firstName")}/>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Last Name</label>
            <input placeholder='Last Name' class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" value={userdetails?.lastName} onChange={(e)=>onchangehandler2(e,"lastName")} />
          </div>
          {/* <hr class="border-gray-200"/> */}
      

          </div>
        <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="email" class="text-sm text-gray-600">UserName</label>
            <input placeholder='UserName' class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email" value={userdetails?.userName} onChange={(e)=>onchangehandler2(e,"userName")}/>
          </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="email" class="text-sm text-gray-600">Email Address</label>
            <input placeholder='Email' class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email" value={userdetails?.emailId} readOnly/>
          </div>
          {/* <div class="md:w-1/2 px-3 mb-6 md:mb-0">
           
          </div> */}
         
          </div>

          <div class="-mx-3 md:flex mb-6">
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Gender</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" value={userdetails?.gender} readOnly/>
          </div>
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Trainer</label>
            <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" value={userdetails?.gender} readOnly/>
          </div>
         
          
         
          </div>

          <div class="-mx-3 md:flex mb-6">
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">State</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" /> */}
            <Select
                      id="state"
                      name="state"
                      placeholder="State"
                      isDisabled
                      
                      onChange={(e) => handlelocation(e, "state")}
                      value={
                        // locationdata?.state
                        //   ? [
                        //       {
                        //         value: locationdata.state,
                        //         label: locationdata.state,
                        //       },
                        //     ]
                        //   : []

                      userdetails?.locationDetails?.state ? getvalue("state",options2) : []
                      }
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={options2}
                      className='pt-2'

                      styles={
                     
                          handleReactSelectCss("xlarge5", false,false,false,true)
                      }
                    ></Select>
          </div>
          {/* <hr class="border-gray-200"/> */}
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="email" class="text-sm text-gray-600">City</label>


            <Select
                      id="city"
                      name="city"
                      placeholder="City"
                      className='pt-2'
                      isDisabled
                      
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }
                      styles={
                     
                        handleReactSelectCss("xlarge5", false,false,false,true)
                    }
                    onChange={(e) => handlelocation(e,"city")}
                      value={
                        // locationdata?.city
                        //   ? [
                        //       {
                        //         value: locationdata.city,
                        //         label: locationdata.city,
                        //       },
                        //     ]
                        //   : []

                        
                      userdetails?.locationDetails?.city ? getvalue("city",options3) : []
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getcity()}
                      options={options3}
                    ></Select>

            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email" name="email"/> */}
          </div>
   
          
          
          </div>

          
          <div class="-mx-3 md:flex mb-6">

          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="location" class="text-sm text-gray-600">Location</label>
            <Select
                      id="location"
                      name="location"
                      placeholder="Location"
                      className='pt-2'
                      isDisabled
                      
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }
                      styles={
                     
                        handleReactSelectCss("xlarge5", false,false,false,true)
                    }
       
                      onChange={(e) => handlelocation(e,"location")}
                      value={
                     
                        // locationdata.location
                        //   ? [
                        //       {
                        //         value: locationdata.locationId,
                        //         label: locationdata.location,
                        //       },
                        //     ]
                        //   : []

                        userdetails?.locationDetails?.locationId ? getvalue("location",options4) : []
                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getlocation()}
                      options={options4}
                    ></Select>



            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="email" name="email"/> */}
          </div>
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label for="name" class="text-sm text-gray-600">Gym Address</label>

            <Select
                      id="gymAddress"
                      name="gymAddress"
                      placeholder="Gym Address"
                      className="leading-4 pt-2"
                 isDisabled
                      
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }

                      // styles={handleReactSelectCss("large", false)}

                      styles={handleReactSelectCss("xlarge5", false,false,false,true)}

                      onChange={(e) => handlegymaddress(e)}
                      value={
                     
                      //  locationdata.ownerId
                      //     ? [
                      //         {
                      //           value: locationdata.ownerId,
                      //           label: locationdata.gymName,
                      //         },
                      //       ]
                      //     : []
                      userdetails.gymId ? getvalue1() : []

                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getGymAddress()}
                      options={options5}
                    ></Select>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" type="text" /> */}
          </div>
 

         
          </div>

          <hr class="border-gray-200"/>
 

        </div>
                  <div class="md:w-1/2  mb-6 md:mb-0 py-11 text-center -ml-2">
          
          <div class=" text-gray-500 text-xs mt-1 font-bold px-1 py-2 rounded-lg float-left  hover:text-gray-600 relative overflow-hidden cursor-pointer">
              {/* <input type="file" name="photo" onchange="loadFile(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/> Change Photo */}

              <div className="relative">
        <img
          src={"data:image/png;base64," + userdetails?.image}
          // src={avatarUrl.current}
          alt="Avatar"
          className="w-[120px] h-[120px] rounded-full border-2 border-gray-400 "
        />
        <button
          className="absolute -bottom-2 -left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>

            </div>
         
</div>
        
        
        </div>
        
        :tab==="passwordupdate" ? 
<div className='md:w-2/3 w-full px-8 pt-28 pb-8 mb-4  flex flex-col'>
<div class="-mx-3 md:flex mb-6 justify-center items-center">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-base font-semibold text-gray-600">Current Pasword:</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-gray-700" type="text" value="" name="name"/> */}
          <input type={showeye ? "text" : "password"} class=" mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" onChange={(e)=>{onchangehandler(e,"currentPassword")}} value={passworddata.currentPassword} placeholder="******************"  style={
                        mandatoryData.includes("confirmNewPassword") &&
                        !passworddata.confirmNewPassword
                          ? { border: "2px solid red" }
                          : {}
                      }

                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                 
/>     <img
                      className="h-5 w-5 z-[100] -mt-8 mr-2 cursor-pointer float-right"
                      src={eyeimgon}
                      alt="eye"
                      onClick={handleShoweye}
                    ></img>
          </div> 
          </div>
          <div class="-mx-3 md:flex mb-6 justify-center items-center">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-base  font-semibold text-gray-600">New Password:</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-gray-700" type="text" value="" name="name"/> */}
          <input type={showeye2 ? "text" : "password"} class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" onChange={(e)=>{onchangehandler(e,"newPassword")}} value={passworddata.newPassword}  placeholder="******************" style={
                        mandatoryData.includes("newPassword") &&
                        !passworddata.newPassword
                          ? { border: "2px solid red" }
                          : {}}  onCopy={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}/>     <img
                          className="h-5 w-5 z-[100] -mt-8 mr-2 cursor-pointer float-right"
                          src={eyeimgon}
                          alt="eye"
                          onClick={handleShoweye2}


                        
                        ></img>
          </div> 
          </div>

          <div class="-mx-3 md:flex mb-6 justify-center items-center">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label for="name" class="text-base  font-semibold text-gray-600">Confirm New Password:</label>
            {/* <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-gray-700" type="text" value="" name="name"/> */}
          <input type={showeye3 ? "text" : "password"} class=" mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 dark:text-white" onChange={(e)=>{onchangehandler(e,"confirmNewPassword")}} value={passworddata.confirmNewPassword}  placeholder="******************"  style={
                        mandatoryData.includes("confirmNewPassword") &&
                        !passworddata.confirmNewPassword
                          ? { border: "2px solid red" }
                          : {}}
                          onCopy={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          />     <img
                          className="h-5 w-5 z-[100] -mt-8 mr-2 cursor-pointer float-right"
                          src={eyeimgon}
                          alt="eye"
                          onClick={handleShoweye3}
                        ></img>
          </div> 
          </div>

          {errcode?<p className="text-sm italic text-red-500 text-center">{errcode}</p>:<></>}
</div>

:<div class="mx-2 md:mb-6 my-8 border-solid w-2/3 py-12">

<div class="md:w-full px-3 mb-6 md:mb-0">
<div className='text-lg font-semibold font-sans text-gray-600 w-96 flex flex-row justify-evenly'>
  
  <div className='flex flex-col gap-y-10'>
   <div>
      Plan Type
      </div>
      <div>
      Time Remaining
      </div>
    </div>
 <div className='flex flex-col gap-y-10'>
<div>:</div>
<div>:</div>
 </div>


<div className='flex flex-col gap-y-10'>
<div>{loginDetails?.planDetails?.planName}</div>
<div>{loginDetails?.planDetails?.planName}</div>
</div>

</div>

  </div>




</div> }

      </div>
      <div class="p-7 pt-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200 ">
        <p class="float-left text-xs text-gray-500 tracking-tight mt-1">{tab==="profileinfo" ?"Click on Save to update your Profile Info":tab==="passwordupdate" ? "Click on Save to update your Password":"Click on Save to update your Plan"}</p>
        {/* <input type="submit" class="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer mb-2" value="Save"/> */}

        <button className='sm:-mt-4 md:-mt-4 bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer -mt-4' onClick={()=>{savefunction();console.log(tab)}}>Save    {flag ? (
                    <CircularProgress
                      color="inherit"
                      size={"15px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}</button>
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

{modalOpen && (
        <ModalDp
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
  </div>

  )
}

export default Setting;