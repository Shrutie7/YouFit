import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_3.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClassesAdminOwner from "./ClassesAdminOwner";
const Classes = () => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  const [classtype, setclasstype] = useState("All Classes");

  const onClickhandlerclass = (name) => {
    let str = "";
    if (name === "all") {
      str = "All Classes";
    }
    if (name === "my") {
      str = "My Classes";
    }
    if(name === "create"){
      str = "Create Class";
    }

    console.log(str);
    setclasstype(str);
  };
  const nav = useNavigate();
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

  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  useEffect(() => {
    setclasstype("All Classes");

    console.log(classtype);
  }, []);
  return (
    <>
      {/* <Header title="Classes" image={HeaderImage}></Header> */}

      {parseInt(loginDetails.roleId) !==1 ? <div className="w-11/12 mx-auto max-w-7xl mt-20 h-screen pt-3">
        <div className="flex justify-center items-center">
          {parseInt(loginDetails?.roleId) !== 3 ? (
            <div
              className={`p-2 m-2 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-lg ${
                classtype === "My Classes" ? "bg-blue-300" : "bg-blue-600"
              }`}
              onClick={() => onClickhandlerclass("my")}
            >
              My Classes
            </div>
          ) : (
            <div
              className={`p-2 m-2 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-lg ${
              classtype === "Create Class" ? "bg-blue-300" : "bg-blue-600"
            }`}
              onClick={()=>{onClickhandlerclass("create");nav("/portal/classes/classcreate")}}
           
            >
              Create Class
            </div>
          )}

          <div
            className={`p-2 m-2 h-12 cursor-pointer text-center w-80 text-xl font-semibold leading-8 rounded-lg ${
              classtype === "All Classes" ? "bg-blue-300" : "bg-blue-600"
            }`}
            onClick={() => onClickhandlerclass("all")}
          >
            All Classes
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold text-white text-center bg-slate-800 rounded-xl p-2 ">
            Classes For {months[month]} - {year}
          </div>
        </div>

        <div>
          <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md:min-h-36 sm:min-h-36 sm:p-6 md:p-6 lg:p-8 mt-4">
            <div className="flex flex-row justify-between">
              <div className="font-extrabold  sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
                MONDAY
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    BOXING 4-5 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    ZUMBA 5-6 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <button
                  className="sm:w-24 md:w-36 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-40 bg-gray-300 hover:bg-black hover:text-white"
                  onClick={() => nav("/portal/classes/classesbook")}
                >
                  Show Classes
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-solid border-black bg-gray-100 w-full max-h-96 lg:min-h-40 md: min-h-28 sm:min-h-28 sm:p-6 md:p-6 lg:p-8 mt-6">
            <div className="flex flex-row justify-between">
              <div className="font-extrabold  sm:text-3xl md:text-3xl lg:text-6xl text-black pl-4">
                TUESDAY
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    BOXING 4-5 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <div className="flex flex-col pr-6 gap-y-4">
                  <div className="sm:text-lg md:text-lg lg:text-2xl font-extrabold text-black">
                    ZUMBA 5-6 PM
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="sm:text-base lg:text-lg font-semibold text-black">
                      INSTRUCTOR: AARON HUGHES
                    </div>
                  </div>
                </div>
                <button
                  className="sm:w-24 md:w-36 sm:text-md m-1 p-2 border border-2 border-solid border-black text-black rounded-full lg:text-lg font-semibold lg:w-40 bg-gray-300 hover:bg-black hover:text-white"
                  onClick={() => nav("/portal/classes/classesbook")}
                >
                  Show Classes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>:
      <ClassesAdminOwner/>
      }
    </>
  );
};

export default Classes;
