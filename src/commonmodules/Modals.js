import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";
import VideoEditor from "./VideoEditor";
import VideoInput from "./VideoInput";

const Modal = ({ updateAvatar, closeModal,file,setfile,type }) => {
  return (
    <div
      className="relative z-[9999] mt-24"
    //   aria-labelledby="crop-image-dialog"
    //   role="dialog"
    //   aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[40vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              {/* {type==="photo"?<ImageCropper
              file={file}
              setfile={setfile}
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />:<VideoEditor/>} */}
              {type==="photo"?<ImageCropper
              file={file}
              setfile={setfile}
                updateAvatar={updateAvatar}
                closeModal={closeModal}
                imagesize={2*1024}
              />:<VideoInput width={300} height={200}  file={file}
              setfile={setfile}
                updateAvatar={updateAvatar}
                closeModal={closeModal}
                videosize={200*1024}
                />}
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;