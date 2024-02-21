import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/LocalAxiosInstance";
import ClassesAdminModal from "./ClassesAdminModal";
import deleteicon from "../../assets/delete-64.png";


const ClassesAdminOwner = () => {
  const classmasterlisturl = "class/master/list";
  const classdeleteurl = "class/master/delete"


  const [addflag,setaddflag] = useState(false);
 
  const [classdata,setclassdata] = useState([]);

  const handledelete = async(ele)=>{
    let localjson = {};

    localjson.classMasterId = ele
try {
  const res = await axiosInstance.post(classdeleteurl,localjson);

  if (res.status === 200) {
    if (res.data.status) {
      console.log(res)

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

  useEffect(() => {
    getclassmasterlist();
  }, []);
  return (
    <div class="flex mt-28">
      <div class="w-11/12 mx-auto max-w-7xl bg-white  shadow-xl mb-6 h-[38rem] flex flex-col">
      <div className="">
          <button
            className={`p-2 m-2 h-12 cursor-pointer text-center float-right w-36 text-xl font-semibold leading-8 rounded-lg bg-blue-600 hover:bg-blue-500`}
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
                         
                        
                            <td className="h-11 text-white bg-blue-300 text-md font-semibold font-sans rounded-l-xl">{i + 1}</td>
                        
                            <td className="h-11 text-white bg-blue-300 text-md font-semibold font-sans">{d?.className}</td>

                            <td className="h-11 text-white bg-blue-300 text-md font-semibold font-sans rounded-r-xl flex items-center justify-around">

                          <div className="text-center">20-02-2024</div>
                          <img src={deleteicon} alt="delete" title="delete class" onClick={()=>handledelete(d?.classId)} className="h-5 w-5 cursor-pointer float-right"/>


                            
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
    </div>
  );
};

export default ClassesAdminOwner;
