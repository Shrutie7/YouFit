import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/LocalAxiosInstance";

const ClassesAdminOwner = () => {
  const classmasterlisturl = "class/master/list";
  const [addflag,setaddflag] = useState(false);
  let classesadd = [
    // {
    //   classes: "",
    // },
  ];
  let [classest, setclassest] = useState([...classesadd]);
  const addclasses = () => {
    let l = [...classest];
    l.push({
      classes: "",
    });
    setclassest([...l]);
  };
  const deleteclasses = (ind) => {
    let l = [...classest];
    l.splice(ind, 1);
    setclassest([...l]);
  };

  const [classdata, setclassdata] = useState([]);
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
          onClick={()=>{setaddflag(true) ;addclasses()}}
          >
            Add Class
          </button>

          <div class="md:w-full px-3 mb-6 md:mb-0">
            <div className="flex justify-between ">
              <div
                className="cursor-pointer bg-gray-600 text-white text-center rounded-[50%] w-6 h-6"
                onClick={() => addclasses()}
              >
                +
              </div>
            </div>

            {addflag?<div className={`h-72 overflow-y-scroll`}>
              {classest.map((ele, ind) => (
                <div className="flex ">
                  <label className="text-center text-black">{ind + 1}</label>
                  <input
                    class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-2"
                    id="company"
                    type="text"
                    placeholder={`Add Class ${ind + 1}`}

                    // onChange={(e) => {
                    //   handlechange1(e,ind);
                    // }}
                    // value={formdata?.features?.at(ind)}
                  />
                  {classest.length !== 1 ? (
                    <div
                      onClick={() => deleteclasses(ind)}
                      className="cursor-pointer text-black"
                    >
                      D
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>:<></>}
          </div>
        </div>

        <div className="pt-8">
          <button   class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ClassesAdminOwner;
