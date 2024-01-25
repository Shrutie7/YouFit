import React, {useState} from 'react';
import Select from "react-select";
import { handleReactSelectCss } from '../../commonmodules/ReactSelectCss';
import axiosInstance from '../../services/LocalAxiosInstance';
import {useNavigate} from "react-router-dom";
const Plancreate = () => {
  const durationOptions = [
    { value: "1", label: "1 month" },
    { value: "3", label: "3 months" },
    { value: "6", label: "6 months" },
    { value: "12", label: "12 months" },
  ];
  const gymOptions = [
    { value: "1", label: "YouFit Gyms Pro" },
    { value: "2", label: "YouFit Gyms Elite" },
 
  ];
  const nav = useNavigate();
  const [options6, setoptions6] = useState([]);
  let getcategoryurl = "categorylist";

  const getcategory = async () => {
    try {
      const res = await axiosInstance.get(getcategoryurl);

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.categoryDetailsList.map((d) => ({
            value: d.categoryId,
            label: d.categoryName,
          }));
          setoptions6([...l]);
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
  return (
  <>
<body class="flex mt-24">
  <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
    <form>
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
              Plan Name*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Plan Name"/>
          
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Plan Description
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="text" placeholder="Plan Description"/>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          {/* <div class="md:w-full px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="application-link">
              Application Link*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="application-link" type="text" placeholder="http://...."/>
          </div> */}

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
              Plan Price*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Plan Price"/>
          
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
              Plan Duration*
            </label>
            {/* <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Plan Name"/> */}
          <Select
                       id="duration"
                      name="duration"
                      className='mt-1'
                      placeholder="Duration"
                      styles={
                        // mandatoryData.includes("gender") && !data.gender
                          // ? handleReactSelectCss("normal", true)
                          handleReactSelectCss("xlarge3", false,true)
                      }
                      // onChange={(e) => handlegender(e)}
                      // value={
                      //   data?.gender
                      //     ? [{ value: data.gender, label: data.gender }]
                      //     : []
                      // }
              
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={durationOptions}




          />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="location">
              Gym Type*
            </label>
            <div>
            <Select
                       id="gymtype"
                      name="gymType"
                      className='mt-1'
                      placeholder="Gym Type"
                      styles={
                        // mandatoryData.includes("gender") && !data.gender
                          // ? handleReactSelectCss("normal", true)
                          handleReactSelectCss("xlarge3", false,true)
                      }
                      // onChange={(e) => handlegender(e)}
                      // value={
                      //   data?.gender
                      //     ? [{ value: data.gender, label: data.gender }]
                      //     : []
                      // }
              
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={gymOptions}




          />
            </div>
          </div>
          {/* <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="job-type">
              Job Type*
            </label>
            <div>
              <select class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="job-type">
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div> */}
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="department">
              Categories*
            </label>
            <div>
            <Select
                       id="category"
                      name="category"
                      className='mt-1'
                      placeholder="Category"
                      isMulti
                      styles={
                        // mandatoryData.includes("gender") && !data.gender
                          // ? handleReactSelectCss("normal", true)
                          handleReactSelectCss("xlarge3", false,true)
                      }
                      // onChange={(e) => handlegender(e)}
                      // value={
                      //   data?.gender
                      //     ? [{ value: data.gender, label: data.gender }]
                      //     : []
                      // }
              
              onMenuOpen={()=>getcategory()}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      options={options6}




          />
            </div>
          </div>
        </div>
        <div class="-mx-3 md:flex mt-2">
          <div class="md:w-full px-3">
            <button class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
              Submit
            </button>
          </div>
        </div>
        
      </div>
      <button onClick={()=>nav("/portal/plans")} class="md:w-1/5 lg:-ml-11 text-black italic font-bold border-b-4 hover:border-b-2 hover:text-blue-600 hover:underline border-gray-500 hover:border-gray-100 rounded-lg">
              Back
            </button>
    </form>
  </div>
</body>
  </>
  )
};

export default Plancreate;
