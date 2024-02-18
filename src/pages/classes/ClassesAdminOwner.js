import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/LocalAxiosInstance";
import ClassesAdminModal from "./ClassesAdminModal";

const ClassesAdminOwner = () => {
  const classmasterlisturl = "class/master/list";
  const [addflag,setaddflag] = useState(false);
 
  const [classdata,setclassdata] = useState([]);
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

  useEffect(() => {
    getclassmasterlist();
  }, []);
  return (
    <div class="flex mt-28">
      <div class="bg-gray-200 w-11/12 mx-auto max-w-7xl bg-white py-10 px-12 lg:px-12 shadow-xl mb-12">
        {classdata.map((ele) => (
          <div class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="text-black text-2xl text-center">
              {ele?.className}
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center">
          <button
            className={`p-2 m-2 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-lg bg-blue-600 hover:bg-blue-500`}
          // onClick={()=>setaddflag(true)}
          onClick={()=>{setaddflag(true)}}
          >
            Add Class
          </button>


        </div>

     
      </div>

      {
        addflag && <ClassesAdminModal
        closeModal={() => setaddflag(false)}

        />
      }
    </div>
  );
};

export default ClassesAdminOwner;
