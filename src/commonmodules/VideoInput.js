import React, { useRef, useState } from "react";

import { Player } from "video-react";
export default function VideoInput({
  closeModal,
  updateAvatar,
  height,
  setfile,
  videosize,
}) {
  const inputRef = useRef();
  const previewCanvasRef = useRef(null);

  const [error, setError] = useState("");
  const [source, setSource] = useState();
  const [crop, setcrop] = useState(false);

  const handleFileChange = (event) => {
    if (event) {
      const file = event.target.files[0];
      console.log(file);
      setfile(file);
      if (!file) return;
      let sz = Math.round(event.target.files[0]?.size / 1024);
      var filetype = event?.target?.files[0]?.name.substring(
        event?.target?.files[0]?.name.lastIndexOf(".") + 1,
        event?.target?.files[0]?.name.length
      );
      var allowedtypes = ["mp4", "mov"];
      if (error) setError("");
      if (allowedtypes.indexOf(filetype?.toString()?.toLowerCase()) < 0) {
        event.target.value = null;
        setError("Allowed file types are only .mp4, .mov");
        setSource("");
        // let jsondata = { image: "", error: "err013" };
        // storeimagedata(jsondata);
      } else if (file) {
        if (parseInt(sz) <= parseInt(videosize)) {
          // console.log("dataUri",imagesize,sz);
          // fileToDataUri(path).then((dataUri) => {

          //   setimage(dataUri);
          // });

          const url = URL.createObjectURL(file);
          console.log(url);
          setSource(url);
        } else {
          // setsetImagebig(true)
          console.log("notable to fix");
          event.target.value = null;
          setError("Video size should not be beyond 200 MB");
          setSource("");
        }
      }
      // const url = URL.createObjectURL(file);
      // console.log(url)
      // setSource(url);
    }
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
      {error && <p className="text-red-400 text-xs">{error}</p>}
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

      {source && (
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

          onClick={() => {
            closeModal();
            setcrop(true);
            updateAvatar(source);
          }}
        >
          Crop Video
        </button>
      )}

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
