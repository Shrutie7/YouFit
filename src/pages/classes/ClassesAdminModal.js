import { useState } from "react";
import CloseIcon from "../../commonmodules/CloseIcon";


const ClassesAdminModal = ({closeModal }) => {
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
    
  return (
    <div
      className="relative z-[9999] mt-24"
    //   aria-labelledby="crop-image-dialog"
    //   role="dialog"
    //   aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-300 bg-opacity-20 transition-all backdrop-blur-sm"></div>
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
            <div className="flex justify-between ">
              <div
                className="cursor-pointer bg-gray-600 text-white text-center rounded-[50%] w-6 h-6"
                onClick={() => addclasses()}
              >
                +
              </div>
            </div>

            <div className={`h-96 overflow-y-scroll`}>
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
            </div>
            <div className="pt-8">
          <button   class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">Submit</button>
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