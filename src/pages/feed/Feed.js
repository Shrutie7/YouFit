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
import { Player, BigPlayButton, ControlBar } from "video-react";
import { format } from "timeago.js";
import control from "../../assets/control.png"
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
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndexOverlay, setOpenIndexOverlay] = useState(null);
  const [metadata, setMetadata] = useState({ ...jsondata });
  const [feeddata, setfeeddata] = useState([]);
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
    { title: "Settings", src: settings },
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
      setOpen(false)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
          // let l = res.data.data.categoryDetailsList.map((d) => ({
          //   value: d.categoryId,
          //   label: d.categoryName,
          // }));
          // setoptions6([...l]);
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

      // Remove the selected category from the state
      // let updatedCategories = [...categorydata];
      // updatedCategories.splice(index, 1);

      // Update the state with the modified array
      // setcategorydata(updatedCategories);
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
      <div class="dark:font-sans">
        <div class="flex font-sans">
            <div
        className={` ${
          open ? "w-72" : "w-20 " 
        }  bg-zinc-800 p-5 pt-8 duration-300 mt-20 sticky top-0 z-50`}
      >
        <img
          src={control}
          className={`    absolute cursor-pointer -right-3 top-9 w-7 border-cyan-500
           border-2 rounded-full  ${!open && "rotate-180"}  ${isMobile && "opacity-60 pointer-events-none"}`}
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
            Welcome to feed
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
              <img src={Menu.src} alt="icon" className="h-6 w-6 lg:h-6 lg:w-6 lg:border-red-400 border-2"/>
              <span className={`${!open && "hidden"} origin-left duration-200 text-lg font-sans`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
          {/* </div> */}

          <div class="w-full mt-4 lg:w-2/3 xl:w-3/5 pt-32 lg:pt-16 px-2">
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
                          <div
                            // onClick={() => handleActionClick('Delete')}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-lg focus:outline-none"
                          >
                            Delete
                          </div>
                          <div
                            // onClick={() => handleActionClick('Archive')}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                          >
                            Archive
                          </div>
                          <div
                            // onClick={() => handleActionClick('Download')}
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
                      <Player
                        playsInline
                        autoPlay
                        // ref={previewCanvasRef}
                        src={
                          "http://" +
                          process.env.REACT_APP_LOCAL_AXIOS_URL +
                          ele?.contentUrl
                        }
                        // fluid={false}
                        // ref={videoRef}
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
                          </div>
                        </ControlBar>
                      </Player>
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
                    <div className="overflow-y-scroll h-44 overflow-x-hidden">
                      <div className="py-2 px-4 ">
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
    </>
  );
};

export default Feed;
