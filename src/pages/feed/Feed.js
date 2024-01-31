import React, { createRef, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import heart from "../../assets/heart2.png";
import heart2 from "../../assets/heart (1).png";
import explore from "../../assets/explore.png";
import archived from "../../assets/archived.png";
import bookmarks from "../../assets/bookmarks.png";
import settings from "../../assets/settings (2).png";
import chat from "../../assets/speech-bubble.png";

import send from "../../assets/send-message.png";
import { MoreVert } from "@material-ui/icons";
import { Player, BigPlayButton, ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,FullscreenToggle,
  PlaybackRateMenuButton,VolumeMenuButton } from "video-react";
import 'video-react/dist/video-react.css';
import { format } from "timeago.js";
import control from "../../assets/control.png";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
  VideoCall,
} from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import sh from "./Feed.module.css";
import { useSelector } from "react-redux";
import Modal from "../../commonmodules/Modals";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/LocalAxiosInstance";
const Feed = () => {
  const loginDetails = useSelector((e) => e.logindetails.data);
  const jsondata = {
    title: "",
    description: "",
    userId: loginDetails?.userId,
    categoryId: 1,
    file: "",
  };
  const playerRef = useRef(null);


  const [deletemodal, setdeletemodal] = useState(false);
  const [archivemodal, setarchivemodal] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndexOverlay, setOpenIndexOverlay] = useState(null);
  const [metadata, setMetadata] = useState({ ...jsondata });
  const [feeddata, setfeeddata] = useState([]);
  const [datadel, setdatadel] = useState();
  const descRef = useRef();
  let videoRef = createRef();
  const [categorydata, setcategorydata] = useState([]);
  console.log(loginDetails);
  const [file, setFile] = useState(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const isCategorySelected = (categoryId) =>
    selectedCategoryIds.includes(categoryId);
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Explore", src: explore },
    { title: "Settings", src: settings ,navpath:"/portal/settings"},
    { title: "Archived Posts", src: archived },
    { title: "Bookmarks Posts ", src: bookmarks },
  ];
  const [playbackRate, setplaybackRate] = useState(1.0);
  const [comment, setcomment] = useState(false);
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [type, settype] = useState(null);
  const [flag, setflag] = useState(false);
  const [postlikeslist, setpostlikeslist] = useState([]);
  const [likelistflag, setlikelistflag] = useState(false);
  const avatarUrl = useRef(null);
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  let postcreateurl = "post/create";
  let getcategoryurl = "categorylist";
  let likeurl = "post/like";
  let dislikeurl = "post/dislike";
  let postlikelisturl = "post/likes/list";
  let postlisturl = "post/list";
  let postgeturl = "post/get";
  let deletearchiveurl = "post/update";
  // let archiveurl = "post/update";
  let downloadmediaurl = "post/download/media/";

  const overlayRef = useRef(null);
  async function asynForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleoverlay = (ind) => {
    setOpenIndexOverlay(openIndexOverlay === ind ? null : ind);
  };
  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleinput = (e, name) => {
    let l = { ...metadata };
    l[name] = e.target.value;
    setMetadata({ ...l });
  };

  const getcategory = async () => {
    try {
      const res = await axiosInstance.get(getcategoryurl);

      if (res.status === 200) {
        if (res.data.status) {
      
          let l = res.data.data.categoryDetailsList;
          setcategorydata([...l]);
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

  const downloadpost = async (contenturl ) => {
    let slicedurl = contenturl.slice(contenturl.lastIndexOf("/") + 1, contenturl.length);
    console.log(slicedurl)
    try {
      const res = await axiosInstance.get(`post/download/media/${slicedurl}`);

      if (res.status === 200) {
        if (res.data.status) {
      console.log("downloaded")
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
  const deleteandarchiveapi = async (flagtype, ele) => {
    const localjson = {};
    localjson.postId = ele.postId;
    localjson.title = ele.title;
    localjson.description = ele.description;
    localjson.userId = loginDetails?.userId;
    localjson.activeFlag = flagtype === "delete" ? false : true;
    localjson.archivedFlag = flagtype === "archive" ? true : false;
    localjson.remarks = ele?.remarks;
    console.log(localjson);
    try {
      const res = await axiosInstance.post(deletearchiveurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          postlistapi();
          console.log("deleted");

          flagtype === "delete"
            ? setdeletemodal(false)
            : setarchivemodal(false);
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

  const postgetapi = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = postid;
    localjson.userId = userid;
    try {
      const res = await axiosInstance.post(postgeturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res.data.data);

          let newArray = [
            ...feeddata.slice(0, ind),
            res?.data?.data,
            ...feeddata.slice(ind + 1),
          ];

          setfeeddata([...newArray]);
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
  const postlistapi = async () => {
    let localjson = {};
    localjson.userId = parseInt(loginDetails.userId);
    localjson.categoryId = "";
    localjson.roleId = parseInt(loginDetails.roleId);
    try {
      const res = await axiosInstance.post(postlisturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res.data.data);

          // await asynForEach(fdata, async (ele, ind) => {
          //   let json = {};

          //   let l = await mediaapi(ele?.contentUrl);

          // });

          setfeeddata([...res?.data?.data?.postList]);
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

  const postcreateapi = async () => {
    // let cat = [...categorydata];
    // let arr = [];
    // cat.forEach((ele) => {
    //   arr.push(ele.categoryId);
    // });
    // console.log(arr);
    // console.log(arr[0]);

    let localjson = {};
    localjson.categoryId = [...selectedCategoryIds];
    localjson.userId = loginDetails.userId;
    localjson.title = metadata.title;
    localjson.description = metadata.description;

    console.log(localjson);
    const bodyFormData = new FormData();
    bodyFormData.append("content", file);

    console.log(bodyFormData);
    const metadataJson = JSON.stringify({
      ...localjson,
    });
    console.log(metadataJson);
    const _metadata = new Blob([metadataJson], {
      type: "application/json",
    });
    bodyFormData.append("jsonData", _metadata);

    console.log(bodyFormData);
    setflag(true);
    try {
      const res = await axiosInstance.post(postcreateurl, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res.data.message);

          setMetadata({ ...jsondata });
          setFile(null);

          toast(`🦄 Post Created Successfully`, {
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
              setMetadata({ ...jsondata });
              setFile(null);
              setcategorydata([]);
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
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
    setflag(false);
  };
  useEffect(() => {
    getcategory();
  }, [metadata.title, metadata.description]);

  useEffect(() => {
    postlistapi();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the modal is open and close it when scrolling occurs
      if (deletemodal) {
        setdeletemodal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, [deletemodal]);
  const selectcategory = (ele, index) => {
    // if (!isCategorySelected(ele?.categoryId)) {
    //   setSelectedCategoryIds((prevIds) => [...prevIds, ele?.categoryId]);
    // }

    // Check if the category is already selected
    if (isCategorySelected(ele?.categoryId)) {
      // If selected, remove it from the array
      setSelectedCategoryIds((prevIds) =>
        prevIds.filter((id) => id !== ele?.categoryId)
      );
    } else {
      // If not selected, add it to the array
      setSelectedCategoryIds((prevIds) => [...prevIds, ele?.categoryId]);
    }
  };

  console.log(selectedCategoryIds);

  const handleSpeedChange = (event) => {
    // console.log(e.target.value);
    // setplaybackRate(JSON.stringify(e.target.value));
    // if (videoRef.current) {
    //   videoRef.current.playbackRate = JSON.stringify(e.target.value);
    // }

    const newSpeed = parseFloat(event.target.value);

    if (!isNaN(newSpeed) && isFinite(newSpeed)) {
      setplaybackRate(newSpeed);

      if (videoRef.current) {
        videoRef.current.playbackRate = newSpeed;
      }
    }
  };

  const handlelike = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = parseInt(postid);
    localjson.userId = parseInt(userid);
    try {
      const res = await axiosInstance.post(likeurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // postlistapi();
          postgetapi(postid, userid, ind);
          console.log("postliked");
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
  const handledislike = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = parseInt(postid);
    localjson.userId = parseInt(userid);
    try {
      const res = await axiosInstance.post(dislikeurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // postlistapi();
          postgetapi(postid, userid, ind);
          console.log("postliked");
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

  const handlepostlikeslist = async (postid, userid, ind) => {
    try {
      const res = await axiosInstance.post(postlikelisturl, {
        postId: postid,
        userId: userid,
      });

      if (res.status === 200) {
        if (res.data.status) {
          setlikelistflag(!likelistflag);
          setOpenIndex(ind === openIndex ? null : ind);
          setcomment(false);
          setpostlikeslist([...res.data.data.postLikesDetails]);
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

  return (
    <>
      <div class="dark:font-sans h-full relative">
        <div class="flex font-sans relative h-full">
          <div
            className={` ${
              open ? "w-72 sticky top-0 z-100" : "w-20 "
            }  bg-zinc-800 p-5 pt-8 duration-300 mt-20 sticky top-0 z-100`}
          >
            <img
              src={control}
              className={` absolute cursor-pointer -right-3 top-9 w-7 border-cyan-500
            border-2 rounded-full  ${!open && "rotate-180"}  ${
                isMobile && "opacity-60 pointer-events-none"
              }`}
              onClick={() => setOpen(!open)}
              alt="control"
            />
            <div className="flex gap-x-4 items-center">
              {/* <img
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            /> */}
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Welcome to Feed
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-slate-500   text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-5"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  <img
                    src={Menu.src}
                    alt="icon"
                    className="h-6 w-6 lg:h-6 lg:w-6 lg:border-red-400 border-2"
                    onClick={()=>nav(Menu.navpath)}
                  />
                  <span
                  onClick={()=>nav(Menu.navpath)}
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 text-lg font-sans`}
                  >
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* </div> */}
          {console.log(open)}
          <div
            class={` ${
              open === false ? "xl:w-[75%]" : "xl:w-3/5 "
            } w-full mt-4 lg:w-2/3 pt-32 lg:pt-16 px-2 `}
          >
            {parseInt(loginDetails?.roleId) === parseInt(3) ? (
              <div class="px-4 mt-4 shadow rounded-lg bg-white">
                <div class="p-2 border-b border-gray-300 flex flex-col gap-2">
                  <input
                    placeholder={`Whats on your mind ${loginDetails.firstName} ?`}
                    className={sh.shareInput}
                    value={metadata.title}
                    ref={descRef}
                    onChange={(e) => handleinput(e, "title")}
                  ></input>

                  {metadata.title !== "" ? (
                    <input
                      placeholder={`Share some more details on the post you are creating ...`}
                      className={sh.shareInput1}
                      ref={descRef}
                      value={metadata.description}
                      onChange={(e) => handleinput(e, "description")}
                    ></input>
                  ) : (
                    <></>
                  )}

                  {metadata.title !== "" && metadata.description !== "" ? (
                    <div className="flex flex-wrap gap-3  ">
                      {categorydata.map((ele, ind) => (
                        <div
                          key={ind}
                          onClick={() => selectcategory(ele, ind)}
                          className={`text-black border-black border-solid border-2 rounded-md p-2 cursor-pointer bg-green-400 ${
                            isCategorySelected(ele?.categoryId)
                              ? "bg-green-300 opacity-65"
                              : "bg-green-600 hover:bg-green-500"
                          }`}
                        >
                          {ele?.categoryName}
                          {/* {
                            <Cancel
                              className={sh.shareCancelImg1}
                              onClick={() => removecategory(ele, ind)}
                              color="black"
                            />
                          } */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}

                  <hr className={sh.shareHr}></hr>
                  {file && (
                    <div className={sh.shareImgContainer}>
                      {/* URL.createObjectURL allows us to create pseudo url to view file before uploading  */}
                      {type === "photo" ? (
                        <img
                          className={sh.shareImg}
                          // src={URL.createObjectURL(file)}
                          src={avatarUrl.current}
                          alt="Preview of Uploaded Image"
                        />
                      ) : (
                        <>
                          <Player
                            playsInline
                            // autoPlay
                            // ref={previewCanvasRef}
                            src={avatarUrl.current}
                            // fluid={false}
                            ref={videoRef}
                            width="100%"
                            height={500}
                            position="center"
                            // playbackRate={playbackRate}
                            // width={480}
                            // height={272}>
                          >
                            <BigPlayButton position="center" />
                            <ControlBar>
                              <div className={sh.videoreactcontrolbar}>
                                {/* Add buttons or controls to change playback speed */}
                                <select
                                  id="playbackRate"
                                  name="playbackRate"
                                  onChange={(e) => handleSpeedChange(e)}
                                >
                                  <option value={0.5}>0.5x</option>
                                  <option value={0.75}>0.75x</option>
                                  <option value={1.0} selected>
                                    1x
                                  </option>
                                  <option value={1.25}>1.25x</option>
                                  <option value={1.5}>1.5x</option>
                                  <option value={2.0}>2x</option>
                                </select>
                                {/* <button onClick={() => handleSpeedChange(0.5)}>
                                  0.5x
                                </button>
                                <button onClick={() => handleSpeedChange(1.0)}>
                                  1.0x
                                </button>
                                <button onClick={() => handleSpeedChange(1.25)}>
                                  1.25x
                                </button> */}
                                {/* <button onClick={() => handleSpeedChange(1.5)}>
                                  1.5x
                                </button>
                                <button onClick={() => handleSpeedChange(2.0)}>
                                  2.0x
                                </button> */}
                                {/* Add more buttons or controls as needed */}
                              </div>
                            </ControlBar>
                          </Player>
                        </>
                      )}

                      <Cancel
                        className={sh.shareCancelImg}
                        onClick={() => setFile(null)}
                        color="black"
                      />
                    </div>
                  )}
                </div>

                <div className={sh.shareOptions}>
                  <label htmlFor="file" className={sh.shareOption}>
                    <PermMedia
                      htmlColor="tomato"
                      className={sh.shareIcon}
                      onClick={() => {
                        setModalOpen(true);
                        settype("photo");
                      }}
                    ></PermMedia>
                    <span
                      className={sh.shareOptionText}
                      onClick={() => {
                        setModalOpen(true);
                        settype("photo");
                      }}
                    >
                      Photo
                    </span>
                    {/* to upload only 1 file at a time e.target.files[0]*/}
                    {/* <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  /> */}
                  </label>
                  <div className={sh.shareOption}>
                    <VideoCall
                      htmlColor="blue"
                      className={sh.shareIcon}
                      onClick={() => {
                        setModalOpen(true);
                        settype("video");
                      }}
                    ></VideoCall>
                    <span
                      className={sh.shareOptionText}
                      onClick={() => {
                        setModalOpen(true);
                        settype("video");
                      }}
                    >
                      Video
                    </span>
                  </div>
                  <div className={sh.shareOption}>
                    <Room htmlColor="green" className={sh.shareIcon}></Room>
                    <span className={sh.shareOptionText}>Location</span>
                  </div>
                  {/* <div className={sh.shareOption}>
                    <EmojiEmotions
                      htmlColor="goldenrod"
                      className={sh.shareIcon}
                    ></EmojiEmotions>
                    <span className={sh.shareOptionText}>Feelings</span>
                  </div> */}
                </div>
                <button
                  className={sh.shareButton}
                  onClick={() => postcreateapi()}
                >
                  Share
                  {flag ? (
                    <CircularProgress
                      color="inherit"
                      size={"15px"}
                    ></CircularProgress>
                  ) : (
                    <></>
                  )}
                </button>
              </div>
            ) : (
              <></>
            )}

            <div>
              <div></div>

              {feeddata.map((ele, ind) => (
                <div class="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg relative">
                  <div class="flex items-center justify-between px-4 py-2">
                    <div class="flex space-x-2 items-center">
                      <div class="flex flex-col">
                        <div class="font-semibold text-black">
                          {ele?.updatedBy?.userName}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {format(ele?.postedDate)}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => toggleoverlay(ind)}
                      class="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-black dark:hover:bg-dark-third rounded-full cursor-pointer"
                    >
                      <MoreVert />

                      {openIndexOverlay === ind && (
                        <div
                          ref={overlayRef}
                          className="absolute top-4 mt-8 w-44 z-[100] bg-white border rounded-lg shadow-lg "
                        >
                          {parseInt(loginDetails?.userId) ===
                          parseInt(ele?.updatedBy?.userId) ? (
                            <div
                              onClick={() => {
                                setdeletemodal(true);
                                setdatadel(ele);
                              }}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-lg focus:outline-none"
                            >
                              Delete
                            </div>
                          ) : (
                            <></>
                          )}
                          {parseInt(loginDetails?.userId) ===
                          parseInt(ele?.updatedBy?.userId) ? (
                            <div
                              onClick={() => {
                                setarchivemodal(true);
                                setdatadel(ele);
                              }}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                            >
                              Archive
                            </div>
                          ) : (
                            <></>
                          )}
                          <div
                            onClick={() => downloadpost(ele?.contentUrl)}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200  hover:rounded-lg focus:outline-none"
                          >
                            Download
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="text-justify px-4 py-2 text-black ">
                    <span className="text-gray-600 text-base">Title:</span>{" "}
                    <span className="text-black text-lg">{ele?.title}</span>
                  </div>
                  <div class="text-justify px-4  text-black">
                    <span className="text-gray-600 text-base">
                      Description:
                    </span>{" "}
                    <span className="text-black text-lg">
                      {ele?.description}
                    </span>
                  </div>
                  <div class="py-2">
                    {ele?.contentType === "image" ? (
                      <img
                        src={
                          "http://" +
                          process.env.REACT_APP_LOCAL_AXIOS_URL +
                          ele?.contentUrl
                        }
                        alt="Post image"
                        className="max-h-96"
                      />
                    ) : (
                      <div className={sh.customvideoplayer}>
                      <Player
                        playsInline
                        
                        autoPlay
                        src={
                          "http://" +
                          process.env.REACT_APP_LOCAL_AXIOS_URL +
                          ele?.contentUrl
                        }
                        width="100%"
                        height={500}
                        position="center"
                      >
                        <BigPlayButton position="center" />
                        <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
        <FullscreenToggle disabled/>
      </ControlBar>
                      </Player>
                      </div>
                    )}
                  </div>
                  <div class="px-4 py-1">
                    <div class="flex items-center justify-between">
                      <div class="flex flex-row-reverse items-center">
                        <span class="ml-2 text-gray-500 dark:text-dark-txt flex gap-3">
                          {!ele?.likeStatus ? (
                            <img
                              src={heart}
                              alt="like"
                              className="h-8 w-8 cursor-pointer"
                              onClick={() => {
                                handlelike(
                                  ele?.postId,
                                  loginDetails?.userId,
                                  ind
                                );
                              }}
                            />
                          ) : (
                            <img
                              src={heart2}
                              alt="like"
                              className="h-8 w-8 cursor-pointer"
                              onClick={() => {
                                handledislike(
                                  ele?.postId,
                                  loginDetails?.userId,
                                  ind
                                );
                                setOpenIndex(null);
                              }}
                            />
                          )}
                          <img
                            src={chat}
                            alt="chat"
                            className="h-9 w-8 cursor-pointer"
                            onClick={() => {
                              setcomment(!comment);
                              setOpenIndex(null);
                            }}
                          />
                        </span>
                        <span class="rounded-full grid place-items-center text-2xl -ml-1 text-red-800">
                          <i class="bx bxs-angry"></i>
                        </span>
                        <span class="rounded-full grid place-items-center text-2xl -ml-1 text-red-500">
                          <i class="bx bxs-heart-circle"></i>
                        </span>
                        <span class="rounded-full grid place-items-center text-2xl -ml-1 text-yellow-500">
                          <i class="bx bx-happy-alt"></i>
                        </span>
                      </div>
                      <div class="text-gray-500 dark:text-dark-txt">
                        <span>90 Comments </span>
                        <span
                          onClick={() =>
                            handlepostlikeslist(
                              ele?.postId,
                              loginDetails?.userId,
                              ind
                            )
                          }
                          className="italic hover:underline cursor-pointer"
                        >
                          {ele?.likesCount === 1
                            ? ele?.likesCount + " Like"
                            : ele?.likesCount + " Likes"}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  {comment ? (
                    <div className="h-44 overflow-y-scroll overflow-x-hidden">
                      <div class="py-2 px-4">
                        <div class="flex space-x-2">
                          {/* <img
                      src="./images/avt-5.jpg"
                      alt="Profile picture"
                      class="w-9 h-9 rounded-full"
                    /> */}
                          <div>
                            <div class="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm text-black">
                              <span class="font-semibold block">John Doe</span>
                              <span>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                              </span>
                            </div>
                            <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                              <span class="font-semibold cursor-pointer">
                                Like
                              </span>
                              <span>.</span>
                              <span class="font-semibold cursor-pointer">
                                Reply
                              </span>
                              <span>.</span>
                              10m ago
                            </div>

                            <div class="flex space-x-2">
                              {/* <img
                          src="./images/avt-7.jpg"
                          alt="Profile picture"
                          class="w-9 h-9 rounded-full"
                        /> */}
                              <div>
                                <div class="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm text-black">
                                  <span class="font-semibold block">
                                    John Doe
                                  </span>
                                  <span>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                  </span>
                                </div>
                                <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                                  <span class="font-semibold cursor-pointer">
                                    Like
                                  </span>
                                  <span>.</span>
                                  <span class="font-semibold cursor-pointer">
                                    Reply
                                  </span>
                                  <span>.</span>
                                  10m ago
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="flex space-x-2">
                          {/* <img
                      src="./images/avt-5.jpg"
                      alt="Profile picture"
                      class="w-9 h-9 rounded-full"
                    /> */}
                          <div>
                            <div class="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm text-black">
                              <span class="font-semibold block">John Doe</span>
                              <span>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. In voluptate ipsa animi
                                corrupti unde, voluptatibus expedita suscipit,
                                itaque, laudantium accusantium aspernatur
                                officia repellendus nihil mollitia soluta
                                distinctio praesentium nulla eos?
                              </span>
                            </div>
                            <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                              <span class="font-semibold cursor-pointer">
                                Like
                              </span>
                              <span>.</span>
                              <span class="font-semibold cursor-pointer">
                                Reply
                              </span>
                              <span>.</span>
                              10m ago
                            </div>

                            <div class="flex space-x-2">
                              {/* <img
                          src="./images/avt-7.jpg"
                          alt="Profile picture"
                          class="w-9 h-9 rounded-full"
                        /> */}
                              <div>
                                <div class="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm text-black">
                                  <span class="font-semibold block">
                                    John Doe
                                  </span>
                                  <span>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                  </span>
                                </div>
                                <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                                  <span class="font-semibold cursor-pointer">
                                    Like
                                  </span>
                                  <span>.</span>
                                  <span class="font-semibold cursor-pointer">
                                    Reply
                                  </span>
                                  <span>.</span>
                                  10m ago
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="py-2 px-4">
                        <div class="flex space-x-2">
                          {/* <img
                      src="./images/tuat.jpg"
                      alt="Profile picture"
                      class="w-9 h-9 rounded-full"
                    /> */}
                          <div class="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              class="outline-none bg-transparent flex-1 text-black"
                            />
                            <div class="flex space-x-0 items-center justify-center">
                              {/* <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                          <i class="bx bx-smile"></i>
                        </span>
                        <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                          <i class="bx bx-camera"></i>
                        </span>
                        <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                          <i class="bx bxs-file-gif"></i>
                        </span>
                        <span class="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                          <i class="bx bx-happy-heart-eyes"></i>
                        </span> */}
                              <img
                                src={send}
                                alt="send"
                                className="h-5 w-5 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {openIndex === ind ? (
                    <div className=" h-24 overflow-x-hidden">
                      <div className="py-2 px-4 h-16 overflow-y-auto">
                        {postlikeslist.map((ele) => (
                          <>
                            {/* <div className="text-black text-base font-medium">{ele?.likedUserData?.userName}</div> */}

                            <div class="flex flex-col">
                              <div class="font-semibold text-gray-600">
                                {ele?.likedUserData?.userName}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {format(ele?.likedOn)}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div class="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
            <div class="h-full">
              <div class="flex justify-between items-center px-4 pt-4">
                <span class="font-semibold text-gray-500 text-lg dark:text-dark-txt">
                  Users
                </span>
                <span class="text-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-third p-2 rounded-md">
                  See All
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <script src="./static/app.js"></script> */}
      </div>
      {modalOpen && (
        <Modal
          file={file}
          setfile={setFile}
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
          type={type}
        />
      )}

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

      {deletemodal ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center mt-28 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-black opacity-80">
              <button
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  onClick={() => setdeletemodal(false)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this Post?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => deleteandarchiveapi("delete", datadel)}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  onClick={() => setdeletemodal(false)}
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {archivemodal ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center mt-28 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-black opacity-80">
              <button
                type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  class="w-3 h-3"
                  onClick={() => setarchivemodal(false)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg
                  class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to archive this Post?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => deleteandarchiveapi("archive", datadel)}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  onClick={() => setarchivemodal(false)}
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Feed;
