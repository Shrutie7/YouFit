import "./plan.css";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_4.jpg";
import Card from "../../UI/Card";
import { plan, plans } from "../../data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/LocalAxiosInstance";
import { useEffect, useState } from "react";
import LoadingPopup from "../../commonmodules/Loading";
import { addloc } from "../../store/location";
const Plan = () => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  const nav = useNavigate();

  const planlisturl = "plan/list";
  const [planlist,setplanlist] = useState([]);
  let [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const getplanlist = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(planlisturl, {
        gymTypeId: loginDetails.roleId===parseInt(loginDetails.userId) ? loginDetails.gymtypeId:2,
      });

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res?.data?.data);
          setplanlist([...res?.data?.data?.ListOfPlans]);
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
  };

  useEffect(() => {
    getplanlist();
  }, []);
  return (
    <>
      <Header title="Membership Plans" image={HeaderImage}>
        {/* lla velit elementum lorem,at aliquam ante leo eu risus. Duis quis magna leo. Suspendisse potenti. */}
      </Header>
      {/* <section className="plans">
        <div className="container planstocontainer">
          {
            plans.map(({id, name, desc, price, features}) => {
              return <Card key={id} className="plan">
                <h3>{name}</h3>
                <small>{desc}</small>
                <h1>{`฿${price}`}</h1><h2>/M</h2>
                <h4>Features</h4>
                {
                  features.map(({feature, available}, index) => {
                    return <p key={index} className={!available ? 'disabled' : ''}>{feature}</p>
                  })
                }
                <button className="bttn lg" onClick={()=>nav("/portal/plan/checkout")}>Choose Plan</button>
              </Card>
            })
          }
        </div>
      </section> */}

      <div class=" mt-0 border-solid">
        <div class="py-8 px-4 lg:py-10 lg:px-6">
          <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Unlock your full potential with our highly curated fitness plans
            </h2>
            {parseInt(loginDetails.roleId) !== parseInt(1) ? (
              <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-200">
                Ready to elevate your fitness game? Select the plan that suits
                your goals and kickstart your wellness adventure!
              </p>
            ) : (
              <button
                className="mx-auto mb-8 max-w-screen-md text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => nav("plancreate")}
              >
                Create Plan
              </button>
            )}
          </div>
          {/* <button onClick={()=>nav("plancreate")}>Create Plan</button> */}
          <div class="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-16 lg:space-y-0">
         
              
              {
                planlist.map((ele)=>(
                    <div class="flex flex-col p-6 mx-auto max-w-96 min-w-96 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800    dark:text-white">
              
              <h3 class="mb-4 text-2xl font-semibold text-white">{ele?.PlanName}</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
               {ele?.planDescription}
              </p>
              <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-4xl font-extrabold">{ele.planPrice}</span>
                <span class="text-gray-500 dark:text-gray-400 text-2xl font-extrabold">/{ele.planDuration}months</span>
              </div>
              <ul role="list" class="mb-8 space-y-4 text-left">
                {/* <li class="flex items-center space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Individual configuration</span>
                </li>
                <li class="flex items-center space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li class="flex items-center space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Team size: <span class="font-semibold">1 developer</span>
                  </span>
                </li>
                <li class="flex items-center space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Premium support: <span class="font-semibold">6 months</span>
                  </span>
                </li>
                <li class="flex items-center space-x-3">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Free updates: <span class="font-semibold">6 months</span>
                  </span>
                </li> */}



                {
                  ele?.listOfFeatures?.map((fe)=>(
                    <li class="flex items-center space-x-3">
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>{fe?.features}</span>
                  </li>
                  ))
                }
              </ul>
              <button
                className={` text-white font-bold py-2 px-4 rounded ${loginDetails?.planDetails?.planId==="" ?"bg-blue-500 hover:bg-blue-700":"bg-blue-500 opacity-50 pointer-events-none" }`}
                onClick={() => {nav("checkout");dispatch(addloc({state:{"planId":ele?.planId}}))}}
              >
                Buy Now
              </button>

                    </div>
                ))
              }
              


            
          </div>
        </div>
      </div>
      {loading && (
        <LoadingPopup state={loading} message="Loading... Please Wait" />
      )}
    </>
  );
};

export default Plan;
