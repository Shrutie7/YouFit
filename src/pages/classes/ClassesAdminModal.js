import { useState } from "react";
import CloseIcon from "../../commonmodules/CloseIcon";
import deleteicon from "../../assets/delete-64.png";
import axiosInstance from "../../services/LocalAxiosInstance";
import { CircularProgress } from "@material-ui/core";
import { Addrowerror } from "../../commonmodules/Addrowerror";

const ClassesAdminModal = ({ closeModal }) => {
  const classcreateurl = "class/master/create";
  const [flag,setflag] = useState(false);
  const [mandatorydata,setmandatorydata] = useState(false);
  let classesadd = [
    {
      classes: "",
    },
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
  const handlechange1 = (e, ind) => {
    let l = [...classest];
    l[ind].classes = e.target.value;

      // Set mandatorydata to true if the current input is empty
  setmandatorydata(l[ind].classes === "");

    setclassest([...l]);
  };

  const checkfun = ()=>{

    let flagz = false;

    classest.forEach((ele)=>{
      console.log(ele)
      if(ele.classes===""){
        flagz = true
      }
    })


    return flagz;
  }
  const createclass = async () => {

    if(checkfun()){

      setmandatorydata(true)
    }
else{
  setmandatorydata(false)
  setflag(true)
  let arr = [];

  classest.forEach((ele) => {
    arr.push(ele?.classes);
  });
  console.log(arr);
  try {
    const res = await axiosInstance.post(classcreateurl, { classList: arr });

    if (res.status === 200) {
      if (res.data.status) {
        closeModal();
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
  setflag(false)
}

 
  };

  return (
    <div
      className="relative z-[9999] mt-24"
      //   aria-labelledby="crop-image-dialog"
      //   role="dialog"
      //   aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-300 bg-opacity-10 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-fit justify-center px-2 py-24 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[30vh] rounded-2xl bg-gray-100 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-black hover:bg-gray-700 hover:text-white focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <div class="md:w-full px-3 mb-6 md:mb-0">
                <div className="flex">
                  <button
                    className="cursor-pointer bg-gray-600 text-white text-center rounded-lg p-2"
                    onClick={() => addclasses()}
                  >
                    Add Classes
                  </button>
                </div>

                <div
                  className={`${
                    classest.length > 7
                      ? "overflow-y-scroll"
                      : "overflow-y-hidden"
                  } h-96  mt-4`}
                >
                  {classest.map((ele, ind) => (
                    <div className="flex ">
                      <label className="text-center text-lg font-semibold text-black mt-2 pr-2">
                        {ind + 1}.
                      </label>
                      <input
                        class="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-2"
                        id="company"
                        type="text"
                        autoComplete="off"
                        placeholder={`Add Class ${ind + 1}`}
                        onChange={(e) => {
                          handlechange1(e, ind);
                        }}
                        style={mandatorydata && classest[ind].classes === "" ? {border:"2px solid red"}:{}}
                        // value={formdata?.features?.at(ind)}
                      />
                      {classest.length !== 1 ? (
                        <img
                          src={deleteicon}
                          alt="delete"
                          onClick={() => deleteclasses(ind)}
                          className="h-5 w-5 mt-2 cursor pointer"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-8">
                  <button
                    class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
                    onClick={() => createclass()}
                  >
                    Submit
                    &nbsp;&nbsp;&nbsp;
                    {
                      flag ?<CircularProgress color="inherit" size={"20px"}></CircularProgress>:<></>
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassesAdminModal;
