import React, { useCallback, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import wrnmsg from "../../css/common_modules/modalpopups.module.css";
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";
import cmncss from "../../css/common_modules/CommonStyle.module.css";

// handleshowerror:to close modal popup page (commonmodal,deletemodal)
// imgview:to show green success tick mark (errormodal)
// modalType:defines type of modal whether delete/common/error (all)
// errCode:on basis of errCode shows error message (error modal)
// logout:logout as true or false to log user out (error modal)
// navpath:navigation path (error modal)
// reasontrig:reasontrig as true or false to show textarea for reason for deleting (deletemodal)
// headerdata:header data  (common modal)
// contentdata:content data in text area  (common modal)
// storeimagedata:send storeimagedata as a function from parent which sets whatever image user selected in a state variable
// imagesize:send image size from parent component less than 512 kb
// events:send events from parent as e in onchange function of input of file
// path:send path from parent as e.target.files[0] in onchange function of input of file
// aspectratio:send aspectratio from parent to set aspectratio for cropped image
// imgsrc:src of image to preview
// height:height of preview image
// width:width of preview image

function Modalpopups({
  handleshowerror,
  modalType,
  events,
  path,
  storeimagedata,
  aspectratio,
  imagesize,
  imgsrc,
  height,
  width,

  setremarksdeletion,
}) {
  const [reason, setreason] = useState({ deletionreason: "" });
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: -23 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [image, setimage] = useState("");
  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  let [setImagebig, setsetImagebig] = useState(false);
  function getImage(e, path) {
    console.log(e);
    if (e) {
      let sz = Math.round(e.target.files[0]?.size / 1024);
      var filetype = e?.target?.files[0]?.name.substring(
        e?.target?.files[0]?.name.lastIndexOf(".") + 1,
        e?.target?.files[0]?.name.length
      );
      console.log("dataUri", imagesize, sz, filetype);
      var allowedtypes = ["jpg", "png", "jpeg"];
      if (allowedtypes.indexOf(filetype?.toString()?.toLowerCase()) < 0) {
        e.target.value = null;
        let jsondata = { image: "", error: "err013" };
        storeimagedata(jsondata);
      } else if (e.target.files[0]) {
        if (parseInt(sz) <= parseInt(imagesize)) {
          console.log("dataUri", imagesize, sz);
          fileToDataUri(path).then((dataUri) => {
            setimage(dataUri);
          });
        } else {
          setsetImagebig(true);
          console.log("notable to fix");
          e.target.value = null;
          let jsondata = { image: "", error: "err012" };
          storeimagedata(jsondata);
        }
      }
    }
  }

  useEffect(() => {
    if (modalType === "imagecrop") {
      getImage(events, path);
    }
  }, [image]);
  const fileToDataUri = async (file) =>
    await new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);

      fileToDataUri(croppedImage).then((d) => {
        let jsondata = { image: d, error: "" };
        storeimagedata(jsondata);
        setZoom(1);
      });
    } catch (e) {}
  }, [image, croppedAreaPixels, 0]);
  return (
    <div>
      {/* image crop modal */}
      {console.log(modalType === "imagecrop")}
      <Modal
        show={modalType === "imagecrop" ? true : false}
        centered
        size={!setImagebig ? "xl" : ""}
      >
        <Modal.Header>
          <Modal.Title>
            <div className={wrnmsg.cropper_heading}>Image Preview</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!setImagebig ? (
            <div className={wrnmsg.crop_container}>
              <Cropper
                image={image ? image : ""}
                crop={crop}
                zoom={zoom}
                aspect={aspectratio / 1}
                // cropSize={{"width":190,"height":200}}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          ) : (
            <div
              className={`${cmncss.subheading} ${wrnmsg.wrngimg} `}
            >{`Max Size ${
              imagesize > 1023
                ? (imagesize / 1024).toFixed(1) + " " + "MB"
                : imagesize + " " + "kb"
            } `}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!setImagebig ? (
            <button
              className={cmncss.button1}
              onClick={() => {
                showCroppedImage();
              }}
            >
              Select Image
            </button>
          ) : (
            <></>
          )}
          <button
            className={cmncss.button1}
            onClick={() => {
              setsetImagebig(false);
              handleshowerror();
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* preview image modal */}
      <Modal show={modalType === "imageView" ? true : false} centered size="md">
        <Modal.Body>
          <div className={wrnmsg.cropper_heading}>Preview Image</div>
          <div
            className={wrnmsg.crop_container1}
            style={{ height: height, width: width }}
          >
            <img className={wrnmsg.crop12} src={imgsrc} alt={"No Image"}></img>
          </div>
          <div className={wrnmsg.buttondivcon}>
            <button
              className={cmncss.button1}
              onClick={(e) => {
                handleshowerror();
              }}
            >
              Close
            </button>
            &nbsp;&nbsp;&nbsp;
          </div>
        </Modal.Body>
      </Modal>




      
    </div>
  );
}

export default Modalpopups;
