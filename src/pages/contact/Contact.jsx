import "./contact.css";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_2.jpg";
import { MdEmail } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { BsLine } from "react-icons/bs";
import axiosInstance from "../../services/LocalAxiosInstance";
import { useState } from "react";
import { handleReactSelectCss } from "../../commonmodules/ReactSelectCss";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";

const Contact = () => {
  let gymaddressurl = "location/gymaddress";
  let trainerurl = "users/trainerlist";
  let createfdburl = "/feedbackcreate";

  const [radioselect, setradioselect] = useState("trainer");

  const handleradio = (e, name) => {
    console.log(e.target.value);

    let l = {...feedbackdata}
    if (name === "gym") {
      l.feedbackTypeId = 2;
    } else {
      l.feedbackTypeId = 1;
    }
    setfeedbackdata({...l})

  };

  const handlechangefunction = (e)=>{

    let l = {...feedbackdata}
    l.message = e.target.value;
    setfeedbackdata({...l});

  }
  const fddata = {
    rating: "",
    feedbackTypeId: 1,
    message:""
  };

  const [feedbackdata, setfeedbackdata] = useState({ ...fddata });

  const [options5, setoptions5] = useState();
  const [options6, setoptions6] = useState();

  const sms = {
    trainerId: "",
    trainerName: "",
    gymId: "",
    gymName: "",
  };

  let [fdata, setfdata] = useState({ ...sms });

  const handlechange = (e, name) => {
    console.log(e, name);
    let l = { ...fdata };

    if (name === "gym") {
      l.gymId = e.value;
      l.gymName = e.label;
    }
    if (name === "trainer") {
      l.trainerId = e.value;
      l.trainerName = e.label;
    }

    setfdata({ ...l });
  };
  // {
  //   "userId":1, //based on user who is giving feedback
  //   "rating":5,
  //   "feedbackTypeId":1, //1 is for trainer 2 is for gym
  //   "trainerUserId":3, //trainer id
  //   "gymId":""}

  const loginDetails = useSelector((e) => e.logindetails.data);
  console.log(loginDetails);

  console.log(loginDetails);
  const getGymAddress = async () => {
    try {
      // location id will come from logindetailsget store it in reduxstore...
      const res = await axiosInstance.post(gymaddressurl, {
        location_id: loginDetails.locationDetails.locationId,
      });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.gymAddressList.map((d) => ({
            value: d.ownerId,
            label: d.gymName,
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
  const getTrainerList = async () => {
    try {
      // location id will come from logindetailsget store it in reduxstore...

      console.log(loginDetails?.parentUserDetails);
      const res = await axiosInstance.post(trainerurl, {
        ownerId: parseInt(loginDetails?.parentUserId),
      });

      if (res.status === 200) {
        if (res.data.status) {
          let l = res.data.data.listOfTrainers.map((d) => ({
            value: d.userId,
            label: d.trainerName,
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

  const submitclickfun = async () => {
    let localjson = {};
    localjson.userId = parseInt(loginDetails?.userId);
    localjson.rating = parseInt(feedbackdata?.rating);
    localjson.feedbackTypeId = feedbackdata?.feedbackTypeId;
    localjson.trainerId = feedbackdata?.feedbackTypeId === 1 ?
      loginDetails?.parentUserId
      : "";
    localjson.gymId = feedbackdata?.feedbackTypeId === 2 ? loginDetails?.gymId : "";
    localjson.message = feedbackdata?.message;

    console.log(localjson);

    try {
      const res = await axiosInstance.post(createfdburl, localjson);
      if (res.status === 200) {
        if (res.data.status) {
          toast(`🦄 Feedback ${parseInt(feedbackdata.feedbackTypeId)===parseInt(2) ? "for Gym":"for Trainer"} Submitted Successfully`, {
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
              let l = {...feedbackdata};
              l.rating=5;
              l.message="";
              l.feedbackTypeId = 1;
              setfeedbackdata({...l})
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
    } catch (error) {}
  };

  const handleradiostar = (e)=>{
    console.log(e.target.value)
    let l = {...feedbackdata};
    l.rating=e.target.value;
    setfeedbackdata({...l});
  }
  return (
    <>
      <Header title="Insights Matter" image={HeaderImage}></Header>
      <section className="bg-blue-50 dark:bg-zinc-700 mt-0" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Feedback
              </p>
              <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-2xl sm:text-4xl">
                Your feedback fuels our growth. Share your thoughts; we're all
                ears!
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400"></p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  Strength doesn't come from the body. It comes from the will.
                  With your feedback we can create a positive and empowering
                  atmosphere within the gym, motivating members to stay
                  committed to their fitness goals.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Head office at Mahadevpura
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Bengaluru, India
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile: +91 9876543210
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mail: supportyoufitgyms@gmail.com
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Gym Working hours
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Monday - Friday: 05:00 - 22:00
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Saturday &amp; Sunday: 07:00 - 20:00
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="cardz h-fit max-w-6xl p-2" id="form">
                <h2 className="mb-4 text-2xl font-bold">
                  Let us know how you feel?
                </h2>
                
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      {/* <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="name"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="text"
                          id="name"
                          autocomplete="given-name"
                          placeholder="Your name"
                          className="bg-white mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-black sm:mb-0"
                          name="name"
                        ></input>
                      </div> */}
                      {/* <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="email"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="email"
                          id="email"
                          autocomplete="email"
                          placeholder="Your email address"
                          className="bg-white mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-black sm:mb-0"
                          name="email"
                        ></input>
                      </div> */}

                      <div className="mb-4 md:flex md:justify-start items-start gap-10 relative z-0">
                        <div className="flex gap-2 mt-4">
                          <input
                            type="radio"
                            defaultChecked
                            name="type"
                            className="mb-6"
                            // id="roleId"
                            onClick={(e) => handleradio(e, "trainer")}
                            value={"trainer"}
                          />
                          <label className="text-white font-semibold text-base mb-6">
                            Rate Trainer
                          </label>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <input
                            type="radio"
                            name="type"
                            className="mb-6"
                            // id="roleId"
                            onClick={(e) => handleradio(e, "gym")}
                            value={"gym"}
                          />
                          <label className="text-white font-semibold text-base mb-6 ">
                            Rate Gym
                          </label>
                        </div>
                        {/* <div className="flex flex-col">
               
                <label
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
                      htmlFor="location"
                    >
                      {radioselect === "gym" ? "Gym Address" : "Trainer"}
                    </label>

                    {
                      radioselect === "gym"?<Select
                      id="gymAddress"
                      name="gymAddress"
                      placeholder="Gym Address"
                      className="bg-none"
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }

                      styles={handleReactSelectCss("large", false)}
                      onChange={(e) => handlechange(e,"gym")}
                      value={
                     
                       fdata.gymId
                          ? [
                              {
                                value:  fdata.gymId,
                                label:  fdata.gymName,
                              },
                            ]
                          : []
                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getGymAddress()}
                      options={options5}
                    ></Select>:
                    <Select
                      id="Trainer"
                      name="trainer"
                      placeholder="Trainer"
                      className="bg-none"
                      // styles={
                      //   mandatoryData.includes("gender") && !data.gender
                      //     ? handleReactSelectCss("small", true)
                      //     : handleReactSelectCss("small", false)
                      // }  

                      styles={handleReactSelectCss("large", false)}
                      onChange={(e) => handlechange(e,"trainer")}
                      value={
                     
                       [
                              {
                                value: fdata.trainerId,
                                label: fdata.trainerName,
                              },
                            ]
                      
                      
                      }
                      // value={selectdraft?.id?[{"value":selectdraft.id,"label":selectdraft.desc}]:[]}
                      menuPortalTarget={document.body}
                      menuPosition={"fixed"}
                      onMenuOpen={()=>getTrainerList()}
                      options={options6}
                    ></Select>
                    }

                </div> */}
                      </div>

                      <div class="mb-4 flex gap-10">
                        <div className="mt-2">Rating</div>
                        <div className="rating rating-lg rating-half">
                          <input
                            type="radio"
                            name="rating-10"
                            className="rating-hidden"
                            value={0.5}
                            onChange={(e)=>handleradiostar(e)}
                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-1"

                            value={0.5}
                            onChange={(e)=>handleradiostar(e)}
                          

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-2"
                            value={1}
                            onChange={(e)=>handleradiostar(e)}
                           

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-1"
                            // checked
                            value={1.5}
                            onChange={(e)=>handleradiostar(e)}
                           

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-2"
                            value={2}
                            onChange={(e)=>handleradiostar(e)}
                            

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-1"
                            value={2.5}
                            onChange={(e)=>handleradiostar(e)}
                          

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-2"
                            value={3}
                            onChange={(e)=>handleradiostar(e)}
                        

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-1"
                            value={3.5}
                            onChange={(e)=>handleradiostar(e)}
                          

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-2"
                            value={4}
                            onChange={(e)=>handleradiostar(e)}
                          

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-1"
                            value={4.5}
                            onChange={(e)=>handleradiostar(e)}
                           

                          />
                          <input
                            type="radio"
                            name="rating-10"
                            className="bg-green-500 mask mask-star-2 mask-half-2"
                            value={5}
                            onChange={(e)=>handleradiostar(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        for="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <textarea
                        id="textarea"
                        name="textarea"
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        onChange={(e)=>handlechangefunction(e)}
                        value={feedbackdata.message}
                        className="bg-white resize-none mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-black sm:mb-0"
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      // type="submit"
                      onClick={() => {
                        submitclickfun();
                      }}
                      className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 bg-blue-800"
                    >
                      Submit
                    </button>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact">
        <div className="container contacttocontainer">
          <div className="contacttowrapper">
            <a
              href="mailto:support@tiimcmy.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <MdEmail />
            </a>
            <a
              href="http://m.me/ernest_achiever"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsMessenger />
            </a>
            <a
              href="http://line.me/ti/p/~timeizstop"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsLine />
            </a>
          </div>
        </div>

      </section>
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
    </>
  );
};
export default Contact;
