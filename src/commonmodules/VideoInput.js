import React, { useRef, useState } from "react";

import { Player } from "video-react";
export default function VideoInput({closeModal, updateAvatar ,height,setfile}) {

  const inputRef = useRef();
  const previewCanvasRef = useRef(null);


  const [source, setSource] = useState();
const [crop,setcrop] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setfile(file);
    const url = URL.createObjectURL(file);

    console.log(url)
    setSource(url);
  };

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
      {source && (
        <video
          className="VideoInput_video"
        //   width="100%"
        width="85%"
          height={height}
          controls
          src={source}
        />
      )}
      {/* <div className="VideoInput_footer">{source || "Nothing selectd"}</div> */}

      {source &&
      
       <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600 text-center"
            // onClick={() => {
            //   setCanvasPreview(
            //     imgRef.current, // HTMLImageElement
            //     previewCanvasRef.current, // HTMLCanvasElement
            //     convertToPixelCrop(
            //       crop,
            //       imgRef.current.width,
            //       imgRef.current.height
            //     )
            //   );
            //   const dataUrl = previewCanvasRef.current.toDataURL();
            //   updateAvatar(dataUrl);
            //   closeModal();
            // }}

            onClick={()=>{
             
              closeModal();
              setcrop(true)
               updateAvatar(source);
           
            }}
          >
            Crop Video
          </button>
          
          }

          {crop && (
            <Player
          playsInline
          ref={previewCanvasRef}
          src={source}
          fluid={false}
          width={480}
          height={272}
      />
        
      )}
    </div>
  );
}
