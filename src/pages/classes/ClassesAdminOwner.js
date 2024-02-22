import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/LocalAxiosInstance";
import ClassesAdminModal from "./ClassesAdminModal";
import deleteicon from "../../assets/delete-64.png";

const ClassesAdminOwner = () => {
  const classmasterlisturl = "class/master/list";
  const classdeleteurl = "class/master/delete";
  const currentDate = new Date();
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

  const [deletemodal, setdeletemodal] = useState(false);
  const [addflag,setaddflag] = useState(false);
 const [datadel,setdatadel] = useState("")
  const [classdata,setclassdata] = useState([]);

  const handledelete = async(ele)=>{
    let localjson = {};
localjson.classMasterId = ele
try {
  const res = await axiosInstance.post(classdeleteurl,localjson);

  if (res.status === 200) {
    if (res.data.status) {
      setdeletemodal(false);

getclassmasterlist();
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



} catch (error) {
  
}

  }
  const getclassmasterlist = async () => {
    try {
      const res = await axiosInstance.get(classmasterlisturl);

      if (res.status === 200) {
        if (res.data.status) {
          // console.log(res)
          setclassdata([...res?.data?.data?.classList]);
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
  const formatDate = (date) => {
    const parsedDate = new Date(date)
    const day = parsedDate.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const month = (parsedDate.getMonth());

    const year = parsedDate.getFullYear();
    return `${day} ${months[month]} ${year}`;
  };


  useEffect(() => {
    getclassmasterlist();
  }, []);
  return (
    <div class="flex mt-28">
      <div class="w-[100%] mx-auto max-w-7xl bg-white  shadow-xl mb-6 h-[38rem] flex flex-col rounded-lg">
      <div className="">
          <button
            className={`p-1 m-2 mr-4 h-10 cursor-pointer text-center float-right w-36 text-xl font-semibold leading-8 rounded-lg bg-blue-500 hover:bg-blue-400`}
          // onClick={()=>setaddflag(true)}
          onClick={()=>{setaddflag(true)}}
          >
            Add Class
          </button>


        </div>
        {/* {classdata.map((ele) => (
          <div class="bg-white shadow-xl rounded px-8 p-2 mb-4 flex flex-col m-3">
            <div className="text-black text-2xl text-center">
              {ele?.className}
            </div>
          </div>
        ))} */}

<div className="ml-[1%] mt-[1%] w-[98%] h-[30rem] overflow-y-auto">
            <table className="w-[100%] border-separate border-spacing-1 -mt-1">
              <thead className="text-center sticky top-0 select-none z-10 h-11">
                <tr className="bg-slate-800 text-white text-lg font-semibold font-sans">
                  <th className="rounded-l-xl">S.No</th>
                  <th>
                    Class Name       
                  </th>
                  <th className="rounded-r-xl">Created On</th>
                </tr>
              </thead>
              <tbody
                className="z-0 select-none text-center"
              >
                {classdata &&
                  classdata?.map((d, i) =>
                    {
                      return (
                        <tr className="select-none ">
                         
                        
                            <td className="h-11 text-white bg-blue-400 text-md font-semibold font-sans rounded-l-xl">{i + 1}</td>
                        
                            <td className="h-11 text-white bg-blue-400 text-md font-semibold font-sans">{d?.className}</td>

                            <td className="h-11 text-white bg-blue-400 text-md font-semibold font-sans rounded-r-xl flex items-center justify-between">

                          <div className="text-center mx-auto">{formatDate(d?.createdOn)}</div>
                          <img src={deleteicon} alt="delete" title="delete class" onClick={()=>{    setdeletemodal(true);
                                  setdatadel(d?.classId);}} className="h-5 w-5 cursor-pointer mr-4"/>


                            
                            </td>
              
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
   

     
      </div>

      {
        addflag && <ClassesAdminModal
        closeModal={() => {setaddflag(false);getclassmasterlist()}}

        />
      }

{deletemodal ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full select-none"
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
                  onClick={() => setdeletemodal(false)}
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
                  Are you sure you want to delete this Class?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => handledelete(datadel)}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  onClick={() => setdeletemodal(false)}
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
    </div>
  );
};

export default ClassesAdminOwner;
