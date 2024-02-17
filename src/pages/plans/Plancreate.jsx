import React, { useState } from "react";
import Select from "react-select";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import axiosInstance from "../../services/LocalAxiosInstance";
import { useNavigate } from "react-router-dom";
import { Addrowerror } from "../../commonmodules/Addrowerror";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
const Plancreate = () => {

  const loc = useSelector((e)=>e.location.state);

  console.log(loc);
  let formjson = {
    planName: "",
    planPrice: "",
    planDescription: "",
    planDuration: "",
    gymTypeId: loc.state ==="pro" ? "1" : "2" ,
    categoryId: [],
    features: ""
  };
  let json = {
    gymTypeName: "",
    gymTypeId: "",
    planDurationName: "",
    planDuration: "",
    categoryId: [],
    categoryName: [],
  };
  let feauturesadd = [{
    features: ""
  }
  ]

  let [featurest, setfeaturest] = useState([...feauturesadd])
  let createplanurl = "plan/create";

  let [formdata, setformdata] = useState({ ...formjson });
  let [formdatalocal, setformdatalocal] = useState({ ...json });

  const [mandatoryData, setMandatoryData] = useState([]);

  const lableMandatoryData = [
    "planName",
    "planPrice",
    "planDescription",
    "planDuration",
    "categoryId",
  ];

  const handlechange = (e, name) => {
    let l = { ...formdata };
    l[name] = e.target.value;
    setformdata({ ...l });
  };
  const handlechange1 = (e, ind) => {
  
let l =[...featurest]
   l[ind].features = e.target.value;
    let l2 = {...formdata};
let arr =[]
    l.forEach((ele)=>{
        arr.push(ele.features)
    })
    console.log(arr);
    l2.features = arr.join(".-.")
    console.log(l2)
    setfeaturest([...l])
setformdata({...l2})
  };


  const handlesingle = (e, name, key) => {
    let l = { ...formdata };
    let l2 = { ...formdatalocal };
    l2[key] = e.label;
    l2[name] = e.value;
    setformdatalocal({ ...l2 });
    l[name] = e.value;

    setformdata({ ...l });
  };
  const handlemulti = (e) => {
    let l = { ...formdata };
    let l2 = { ...formdatalocal };
    console.log(e);
    let arr = [];
    let arr2 = [];

    e.forEach((e) => {
      arr.push(e.value);
      arr2.push(e.label);
    });
    l.categoryId = [...arr];
    l2.categoryId = [...arr];
    l2.categoryName = [...arr2];
    setformdatalocal({ ...l2 });
    console.log(arr);
    setformdata({ ...l });
  };
  const [flag, setflag] = useState(false);
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
  let getcategoryurl = "categorylist/filter";

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

  async function postMainData(gdata) {
    console.log(formdata);
    let res = Addrowerror(lableMandatoryData, formdata);
    if (res?.length > 0) {
      setMandatoryData([...res]);

    } else {
      const dat = { ...gdata };
      setflag(true);
      console.log(dat);
      try {
        const res = await axiosInstance.post(createplanurl, dat);

        if (res?.status === 200) {
          if (res?.data?.status) {
            // console.log("user created");

            setformdata({ ...formjson });
            toast(` Plan Created Successfully`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                nav("/portal/plans");
                setformdata({ ...formjson });
              },
            });

            // nav("/");
          } else {
          }
        } else if (res?.response.status === 401) {
        } else {
        }
      } catch (err) { }
      setflag(false);
    }
  }

  const addfeatures = () => {
    let l = [...featurest]
    l.push({
      features: ""
    })
    setfeaturest([...l])
  }
  const deletefeatures = (ind) => {
    let l = [...featurest]
    l.splice(ind, 1)
    setfeaturest([...l])
  }
  return (
    <>
      <div class="flex mt-24 ">
        <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Plan Name*
                </label>
                <input
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="company"
                  type="text"
                  placeholder="Plan Name"
                  style={
                    mandatoryData.includes("planName") && !formdata?.planName
                      ? { border: "2px solid red" }
                      : {}
                  }
                  onChange={(e) => {
                    handlechange(e, "planName");
                  }}
                  value={formdata.planName}
                />
              </div>
              <div class="md:w-1/2 px-3">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="title"
                >
                  Plan Description
                </label>
                <input
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="title"
                  type="text"
                  placeholder="Plan Description"
                  onChange={(e) => {
                    handlechange(e, "planDescription");
                  }}
                  value={formdata.planDescription}
                  style={
                    mandatoryData.includes("planDescription") &&
                      !formdata?.planDescription
                      ? { border: "2px solid red" }
                      : {}
                  }
                />
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">


              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Plan Price*
                </label>
                <input
                  class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="company"
                  type="text"
                  placeholder="Plan Price"
                  onChange={(e) => handlechange(e, "planPrice")}
                  value={formdata.planPrice}
                  style={
                    mandatoryData.includes("planPrice") && !formdata?.planPrice
                      ? { border: "2px solid red" }
                      : {}
                  }
                />
              </div>

              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="company"
                >
                  Plan Duration*
                </label>
                {/* <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Plan Name"/> */}
                <Select
                  id="duration"
                  name="duration"
                  className="mt-1"
                  placeholder="Duration"
                  styles={
                    mandatoryData.includes("planDuration") &&
                      !formdata?.planDuration
                      ? handleReactSelectCss("xlarge1", true, true)
                      : handleReactSelectCss("xlarge1", false, true)
                  }
                  // onChange={(e) => handlegender(e)}
                  onChange={(e) =>
                    handlesingle(e, "planDuration", "planDurationName")
                  }
                  value={
                    formdatalocal?.planDuration
                      ? [
                        {
                          value: formdatalocal.planDuration,
                          label: formdatalocal.planDurationName,
                        },
                      ]
                      : []
                  }
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                  options={durationOptions}
                />
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-full px-3">
                <label
                  class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="department"
                >
                  Categories*
                </label>
                <div>
                  <Select
                    id="category"
                    name="category"
                    className="mt-1"
                    placeholder="Category"
                    isMulti
                    styles={
                      mandatoryData.includes("categoryId") &&
                        formdata?.categoryId?.length === 0
                        ? handleReactSelectCss("xlarge4", true, true)
                        : handleReactSelectCss("xlarge4", false, true)
                    }
                    onChange={(e) => handlemulti(e)}
                    // value={
                    //   formdatalocal?.categoryId
                    //     ? [{ value: formdatalocal.category, label: data.gender }]
                    //     : []
                    // }

                    onMenuOpen={() => getcategory()}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    options={options6}
                  />
                </div>
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-full px-3 mb-6 md:mb-0">
                <div className="flex justify-between ">
                  <label
                    class="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="location"
                  >
                    Features*
                  </label>
                  <div className="cursor-pointer bg-gray-600 text-white text-center rounded-[50%] w-6 h-6" onClick={() => addfeatures()}>+</div>

                </div>

                <div className="h-24 overflow-y-scroll">
                  {
                    featurest.map((ele, ind) => (
                      <div className="flex ">
                        <label className="text-center text-black">{ind + 1}</label>
                        <input
                          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-2"
                          id="company"
                          type="text"
                          placeholder={`Add Feature ${ind + 1}`}
                       
                          onChange={(e) => {
                            handlechange1(e,ind);
                          }}
                        // value={formdata?.features?.at(ind)}
                        />
                        {featurest.length !== 1 ? <div onClick={() => deletefeatures(ind)} className="cursor-pointer text-black">D</div> : <></>}
                      </div>
                    ))

                  }
                </div>

              </div>

            </div>
            <div class="-mx-3 md:flex mt-2">
              <div class="md:w-full px-3">
                <button
                  class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
                  onClick={() => postMainData(formdata)}
                >
                  Submit &nbsp;&nbsp;&nbsp;
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
            onClick={() => nav("/portal/plans")}
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

export default Plancreate;
