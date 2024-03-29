import React, { createRef, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import heart from "../../assets/heart2.png";
import heart2 from "../../assets/heart (1).png";
import explore from "../../assets/explore.png";
import archived from "../../assets/archived.png";
import bookmarks from "../../assets/bookmarks.png";
import settings from "../../assets/settings (2).png";
import myfeed from "../../assets/activity-feed-64.png";
import categories from "../../assets/icons8-categorize-100.png";
import chat from "../../assets/comment.png";
import bookmarkfill from "../../assets/bookmark.png";
import bookmark from "../../assets/save-instagram.png";
import send from "../../assets/send-message.png";
import deleteicon from "../../assets/delete.png";
import { MoreVert } from "@material-ui/icons";
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  FullscreenToggle,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
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
import axios from "axios";
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


  const [categorysele , setcategorysele] = useState(null);
  const [categoriespostflag,setcategoriespostflag] = useState(false);
  const [commentreplylistfl, setcommentreplylistfl] = useState(false);
  const [commentreplylistdata, setcommentreplylistdata] = useState([]);
  const [openCommentIndex, setOpenCommentIndex] = useState(null);
  const [deletemodal, setdeletemodal] = useState(false);
  const [replyflag, setreplyflag] = useState(false);
  const [archivemodal, setarchivemodal] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndexOverlay, setOpenIndexOverlay] = useState(null);
  const [metadata, setMetadata] = useState({ ...jsondata });
  const [feeddata, setfeeddata] = useState([]);
  const [datadel, setdatadel] = useState();
  const descRef = useRef();
  let videoRef = createRef();
  const [categorydata, setcategorydata] = useState([]);
 const [myfeedflag,setmyfeedflag] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const isCategorySelected = (categoryId) =>
    selectedCategoryIds.includes(categoryId);


    const isCategorySelectedsingle = (categoryId) => {
      return categorysele === categoryId;
    };


  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Explore");
  const Menus = [
    { title: "Explore", src: explore },
    { title: "Settings", src: settings, navpath: "/portal/settings" },
    { title: "Archived Posts", src: archived },
    { title: "Bookmarks Posts", src: bookmarks },
    {title : "My Feed", src: myfeed},
    {title:"Category Posts" , src:categories}
  ];
  const [playbackRate, setplaybackRate] = useState(1.0);
  const [comment, setcomment] = useState(false);
  const nav = useNavigate();
  const [archivefl, setarchivefl] = useState(false);
  const [bookmarksfl, setbookmarksfl] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, settype] = useState(null);
  const [flag, setflag] = useState(false);
  const [postlikeslist, setpostlikeslist] = useState([]);
  const [likelistflag, setlikelistflag] = useState(false);
  const [commentcountflag, setcommentcountflag] = useState(false);
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
  let archivelisturl = "post/list/user/based";
  let downloadmediaurl = "post/download/media/";
  let addbookmarksurl = "post/add/bookmark";
  let removebookmarksurl = "post/remove/bookmark";
  let commentcreateurl = "post/comment/add";
  let commentlisturl = "post/comment/list";
  let commentdeleteurl = "post/comment/delete";
  let commentreplyurl = "post/comment/reply";
  let commentreplylisturl = "post/comment/reply/list";


  const [archivebuttonflag , setarchivebuttonflag] = useState(false);
  const [openreplylist, setopenreplylist] = useState(null);
  const [commententered, setcommententered] = useState("");
  const [commentList, setcommentList] = useState([]);
  const [replyemailid, setreplyemailid] = useState("");
  const [parentcommentid, setparentcommentid] = useState("");
  useEffect(() => {
    // Scroll to the top whenever the component mounts or tab changes
    window.scrollTo(0, 0);

    // If you're using React Router, you can listen for route changes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Attach the event listener for route changes
    // Remove the listener on component unmount to avoid memory leaks
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once
  const onChangeComment = (e) => {
    setcommententered(e.target.value);

    // if(replyflag)
    // {
    //   setcommententered("@" + replyemailid +e.target.value)
    // }
  };

  const createcomment = async (postid, ind) => {
    setreplyflag(false);
    let localjson = {};

    localjson.commentDesc = commententered;
    localjson.userId = loginDetails.userId;
    localjson.postId = postid;
    try {
      const res = await axiosInstance.post(commentcreateurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // console.log(res.data.data);
          setreplyflag(false);
          setOpenCommentIndex(null);
          setcommententered("");
          // console.log("Before commentlistapi - openCommentIndex:", openCommentIndex);
          commentlistapi(postid, ind);
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

  const commentlistapi = async (postid, ind) => {
    let localjson = {};

    localjson.postId = postid;
    try {
      const res = await axiosInstance.post(commentlisturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // console.log(res.data.data);
          setcomment(!comment);

          // console.log("Before set state in commentlistapi - openCommentIndex:", openCommentIndex);
          // setOpenCommentIndex(openCommentIndex === ind ? null : ind);
          setOpenCommentIndex((prevIndex) => (prevIndex === ind ? null : ind));

          setOpenIndex(null);
          // setlikelistflag(false);
          setcommentList([...res?.data?.data?.commentList]);
          postlistapi("explore")
        } else {
          setcommentList([]);
          setOpenCommentIndex((prevIndex) => (prevIndex === ind ? null : ind));
          setOpenIndex(null);
          setopenreplylist(null);
          setcommentreplylistdata([]);
          setcommentreplylistfl(false);
          postlistapi("explore")
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

  const commentdeleteapi = async (commentId, postid, ind) => {
    let localjson = {};

    localjson.commentId = commentId;
    try {
      const res = await axiosInstance.post(commentdeleteurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          setOpenCommentIndex(null);
          setopenreplylist(null)
          // console.log(res.data.data);
          commentlistapi(postid, ind);
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

  const createReply1 = (parentCommentId, emailid) => {
    setreplyflag(true);
    setparentcommentid(parentCommentId);
    setreplyemailid(emailid);
    setcommententered(`@${emailid} `);
  };
  const createreply = async (parentCommentId,postid,ind) => {
    let localjson = {};

    localjson.commentDesc = commententered;
    localjson.userId = loginDetails.userId;
    localjson.parentCommentId = parentCommentId;

    try {
      const res = await axiosInstance.post(commentreplyurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // console.log(res.data.data);

          commentreplylist(parentCommentId,ind);
          setcommententered("");
          commentlistapi(postid,ind);
          setOpenCommentIndex(null);
          // setopenreplylist(null)
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
    setreplyflag(false)
  };
  const commentreplylist = async (commentid, ind) => {
    let localjson = {};

    localjson.commentId = commentid;
    try {
      const res = await axiosInstance.post(commentreplylisturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
       
          setcommentreplylistfl(true);
          setopenreplylist(openreplylist === ind ? null : ind);

          


          setcommentreplylistdata([...res?.data?.data?.commentList]);

          // setcommententered("");
        } else {
          setcommentreplylistdata([]);
          setopenreplylist(null);
          setcommentreplylistfl(false);
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

  // const downloadpost = (contenturl) => {
  //   let slicedurl = contenturl.slice(
  //     contenturl.lastIndexOf("/") + 1,
  //     contenturl.length
  //   );

  //   // Open a new window and set its location to the download URL
  //   const downloadWindow = window.open("http://" + process.env.REACT_APP_LOCAL_AXIOS_URL+ "/"+downloadmediaurl + slicedurl, '_blank');

  //   // Close the window after a short delay
  //   setTimeout(() => {
  //     if (downloadWindow) {
  //       downloadWindow.close();
  //     }
  //   }, 5000); // Adjust the delay as needed
  // };

  const downloadpost = (contenturl) => {
    let slicedurl = contenturl.slice(
      contenturl.lastIndexOf("/") + 1,
      contenturl.length
    );

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Set the iframe source to the download URL
    iframe.src =
      "http://" +
      process.env.REACT_APP_LOCAL_AXIOS_URL +
      "/" +
      downloadmediaurl +
      slicedurl;

    // Remove the iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 5000); // Adjust the delay as needed
  };

  // const downloadpost = async (contenturl) => {
  //   let slicedurl = contenturl.slice(
  //     contenturl.lastIndexOf("/") + 1,
  //     contenturl.length
  //   );
  //   console.log(slicedurl);

  //   try {
  //     const res = await axiosInstance.get(downloadmediaurl + slicedurl, {
  //       responseType: 'blob', // Set the response type to 'blob' to handle binary data
  //     });

  //     console.log(res);
  //     if (res.status === 200) {
  //       if (res.data && res.data.status) {

  //         const href = URL.createObjectURL(res.data);

  //         // create "a" HTML element with href to file & click
  //         const link = document.createElement('a');
  //         link.href = href;
  //         link.setAttribute('download', 'f.mp4'); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();

  //         // clean up "a" element & remove ObjectURL
  //         document.body.removeChild(link);
  //         URL.revokeObjectURL(href);
  //       } else {
  //         // Handle the case where res.data.status is falsy
  //       }
  //     } else if (res.response && res.response.status === 401) {
  //       // Handle 401 Unauthorized
  //     } else {
  //       // Handle other status codes
  //     }
  //   } catch (err) {
  //     console.error("Error during download:", err);
  //     // Handle other errors or log as needed
  //   }
  // };
  const deleteandarchiveapi = async (flagtype, ele) => {
    const localjson = {};
    localjson.postId = ele.postId;
    localjson.title = ele.title;
    localjson.description = ele.description;
    localjson.userId = loginDetails?.userId;
    localjson.activeFlag = flagtype === "delete" ? false : true;
    localjson.archiveFlag = flagtype === "archive" ? true : false;
    localjson.remarks = ele?.remarks;

    try {
      const res = await axiosInstance.post(deletearchiveurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          

          flagtype === "delete"
            ? setdeletemodal(false)
            : setarchivemodal(false);


          if(flagtype === "dearchive"){
            postarchivelistapi()
          }
          else{
            postlistapi("archive");

          }
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

  const postarchivelistapi = async (type) => {
    setarchivefl(true);
    setcategorysele(null)

    setcategoriespostflag(false);
    let localjson = {};

    localjson.archiveFlag = type==="myfeed" ? false:true;
    localjson.userId = loginDetails.userId;
    
   
    
    setarchivebuttonflag(true)

    if(type === "myfeed")
    {
      setmyfeedflag(true);
      setcategorysele(null)
    }
    try {
      const res = await axiosInstance.post(archivelisturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
         

          setfeeddata([...res?.data?.data?.postList]);

        
        } else {
          setfeeddata([])
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
    // setarchivefl(false);
  };
  const postgetapi = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = postid;
    localjson.userId = userid;
    try {
      const res = await axiosInstance.post(postgeturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
         

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
  const postlistapi = async (typez,categoryty) => {
    let localjson = {};
    localjson.userId = parseInt(loginDetails.userId);
    localjson.categoryId = typez === "categories"?categoryty :"" ;
    localjson.roleId = parseInt(loginDetails.roleId);
    localjson.bookmarkFlag = typez === "bookmarks" ? true : false;


    console.log(localjson);

    setarchivefl(false);
    setmyfeedflag(false); 
    if (typez === "bookmarks") {
      setbookmarksfl(true);
      setarchivefl(false);
      setcategoriespostflag(false);
      setcategorysele(null)
    } 

    if(typez === "explore"){
      setbookmarksfl(false);
      setarchivefl(false);
      setcategoriespostflag(false);
      setcategorysele(null)
    }

    if(typez === "categories"){
      setcategoriespostflag(true);
    }

    // if(typez === "archive"){
    //   setarchivefl(true);
    //   setbookmarksfl(false);

    // }
    try {
      const res = await axiosInstance.post(postlisturl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          
        setarchivebuttonflag(false)
          if (res?.data?.data !== null) {
            setfeeddata([...res?.data?.data?.postList]);
          } else {
            setfeeddata([]);
          }
        } else {
          setfeeddata([]);
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

  
    const bodyFormData = new FormData();
    bodyFormData.append("content", file);

    
    const metadataJson = JSON.stringify({
      ...localjson,
    });
  
    const _metadata = new Blob([metadataJson], {
      type: "application/json",
    });
    bodyFormData.append("jsonData", _metadata);

    setflag(true);
    try {
      const res = await axiosInstance.post(postcreateurl, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        if (res.data.status) {


          setMetadata({ ...jsondata });
          setFile(null);
          setSelectedCategoryIds([])

          toast(` Post Created Successfully`, {
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
              postlistapi("explore");
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
    postlistapi("explore");
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

  const selectsinglecategory = (ele,index)=>{
        // Check if the clicked category is already selected
        if (categorysele === ele?.categoryId) {
          // If it is, unselect it
          setcategorysele(null);
        } else {
          // If it's not, select it
          setcategorysele(ele?.categoryId);
          postlistapi("categories",ele?.categoryId)
        }


  }
  // console.log(selectedCategoryIds);

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

  const handleaddbookmarks = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = parseInt(postid);
    localjson.userId = parseInt(userid);
    try {
      const res = await axiosInstance.post(addbookmarksurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          postgetapi(postid, userid, ind);
       
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
  const handleremovebookmarks = async (postid, userid, ind) => {
    let localjson = {};
    localjson.postId = parseInt(postid);
    localjson.userId = parseInt(userid);
    try {
      const res = await axiosInstance.post(removebookmarksurl, localjson);

      if (res.status === 200) {
        if (res.data.status) {
          // postgetapi(postid, userid, ind);

          if(archivefl)
          {
            postgetapi(postid, userid, ind)
          }
          else{
            postlistapi("bookmarks");

          }

       
          
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
          setOpenCommentIndex(null);
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

  const handleKeyPress = (
    event,
    postid,
    ind,
    parentCommentId,
    replyemailid
  ) => {
    if (event.key === "Enter") {
      if (replyflag) {
        createreply(parentcommentid,postid,ind);
      } else {
        createcomment(postid, ind);
      }

      // You may also want to prevent the default behavior (e.g., form submission)
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="dark:font-sans h-full relative ">
        <div className="flex font-sans relative h-full">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            }  bg-zinc-800 p-5 pt-8 duration-300 mt-20 sticky top-0 `}
          >
            <img
              src={control}
              className={` absolute cursor-pointer -right-3 top-9 w-7  border-cyan-500
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
                  className={`flex  rounded-md p-2 cursor-pointer ${
                    activeTab === Menu.title ? "bg-slate-500" : ""
                  }  text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-5"} ${
                    index === 0 && "bg-light-white"
                  } `}

                  onClick={() => {
                      setActiveTab(Menu.title);
                      Menu.title === "Archived Posts"
                        ? postarchivelistapi()
                        : Menu.title === "Explore"
                        ? postlistapi("explore")
                        : Menu.title === "Bookmarks Posts"
                        ? postlistapi("bookmarks"):
                        Menu.title === "My Feed"?
                        postarchivelistapi("myfeed"):
                        Menu.title === "Category Posts"?
                        postlistapi("categories")

                        : nav(Menu.navpath);
                    }}
                  

                >
                  <img
                    src={Menu.src}
                    alt="icon"
                    className="h-6 w-6 lg:h-6 lg:w-6 lg:border-red-400 border-2"
                    // onClick={() => {
                    //   setActiveTab(Menu.title);
                    //   Menu.title === "Archived Posts"
                    //     ? postarchivelistapi()
                    //     : Menu.title === "Explore"
                    //     ? postlistapi("explore")
                    //     : Menu.title === "Bookmarks Posts"
                    //     ? postlistapi("bookmarks")
                    //     : nav(Menu.navpath);
                    // }}
                  />
                  <span
                    // onClick={() => {
                    //   setActiveTab(Menu.title);
                    //   Menu.title === "Archived Posts"
                    //     ? postarchivelistapi()
                    //     : Menu.title === "Explore"
                    //     ? postlistapi("explore")
                    //     : Menu.title === "Bookmarks Posts"
                    //     ? postlistapi("bookmarks")
                    //     : nav(Menu.navpath);
                    // }}
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

          <div
            class={` ${
              open === false ? "xl:w-[75%]" : "xl:w-3/5 "
            } -mt-12 w-full lg:w-full lg:mt-4 lg:w-2/3 pt-32 lg:pt-16 px-2 `}
          >
            {console.log(
              parseInt(loginDetails?.roleId) === parseInt(2) && !archivefl && !bookmarksfl
            ,archivefl , bookmarksfl , "==========>")}

{
  categoriespostflag ? <div className="flex flex-wrap gap-3 mt-4 bg-white p-5 ">    {categorydata.map((ele, ind) => (
                        <div
                          key={ind}
                          // onClick={() => selectcategory(ele, ind)}
                           onClick={()=> selectsinglecategory(ele, ind)}
                          className={`text-black border-black border-solid border-2 rounded-md p-2 cursor-pointer bg-green-400 ${
                            isCategorySelectedsingle(ele?.categoryId)
                              ? "bg-green-300 opacity-65"
                              : "bg-green-600 hover:bg-green-500"
                          }`}
                        >
                          {ele?.categoryName}
                        </div>
                      ))}</div> : <>
                      {(parseInt(loginDetails?.roleId) === parseInt(3) &&
              !archivefl &&
              !bookmarksfl && !myfeedflag) ||
            (parseInt(loginDetails?.roleId) === parseInt(2) &&
              !archivefl &&
              !bookmarksfl && !myfeedflag) ? (
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
                      </>
}



            <div>
              {feeddata.length > 0 ? (
                feeddata.map((ele, ind) => (
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
                               {archivebuttonflag ?"DeArchive":"Archive"}
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
                    {ele?.contentUrl !== "" ?<div class="py-2">
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
                              <PlaybackRateMenuButton
                                rates={[5, 2, 1, 0.5, 0.1]}
                                order={7.1}
                              />
                              <VolumeMenuButton disabled />
                              <FullscreenToggle disabled />
                            </ControlBar>
                          </Player>
                        </div>
                      )}
                    </div>:<></>}
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
                                commentlistapi(ele?.postId, ind);
                                setcommentcountflag(false);
                              }}
                            />
                            {!ele.bookmarkStatus ? (
                              <img
                                src={bookmark}
                                alt="bookmark"
                                className="h-8 w-8 cursor-pointer mt-0.5"
                                onClick={() => {
                                  handleaddbookmarks(
                                    ele?.postId,
                                    loginDetails?.userId,
                                    ind
                                  );
                                }}
                              />
                            ) : (
                              <img
                                src={bookmarkfill}
                                alt="bookmark"
                                className="h-8 w-8 cursor-pointer mt-0.5"
                                // onClick={() => {
                                //   setbookmarksfl(false);
                                // }}
                                onClick={() => {
                                  handleremovebookmarks(
                                    ele?.postId,
                                    loginDetails?.userId,
                                    ind
                                  );
                                }}
                              />
                            )}
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
                          <span
                            className="italic "
                            // onClick={() => {
                            //   setcommentcountflag(true);
                            //   setcomment(!comment);
                            //   setOpenIndex(null);
                            //   commentlistapi(ele?.postId);
                              
                            // }}
                          >
                           {ele?.commentsCount} {ele?.commentsCount === 1 ? "Comment":"Comments"} 


                          </span> &nbsp;
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
                    {console.log(commentList,commentList[0]?.replyCount,openreplylist )}
                    {openCommentIndex === ind ? (
                      <>
                        <div
                          className={`max-h-48 ${
                            commentList.length > 1 || (commentList[0]?.replyCount>=1 && openreplylist!==null)
                              ? "overflow-y-scroll"
                              : "overflow-y-hidden"
                          } overflow-x-hidden`}
                        >
                          <div class="py-2 px-4">
                            {commentList.map((cele, cind) => (
                              <div class="flex space-x-2 flex-col">
                                {/* <img
                      src="./images/avt-5.jpg"
                      alt="Profile picture"
                      class="w-9 h-9 rounded-full"
                    /> */}
                                <div>
                                  <div class="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm text-black">
                                    <span class="font-semibold block">
                                      {cele?.commentedUserData?.userName}&nbsp;&nbsp;
                                      <span className = "font-normal text-slate-600">
                                             {
                                                cele?.commentedUserData?.emailId
                                              }
                                               </span>

                                    </span>
                                    <span>{cele?.comment}</span>
                                  </div>

                                  <div class="p-2 text-xs text-gray-500 dark:text-dark-txt flex">
                                    <span>
                                      <img
                                        src={deleteicon}
                                        alt="delete"
                                        className="h-4 w-4 opacity-30 cursor-pointer"
                                        onClick={() => {
                                          commentdeleteapi(
                                            cele?.commentId,
                                            ele?.postId,
                                            ind
                                          );
                                        }}
                                      />
                                    </span>
                                    {cele?.replyCount>0 ? <span
                                      class="font-semibold cursor-pointer"
                                      onClick={() => {
                                        commentreplylist(cele?.commentId, cind);
                                    
                                      }}
                                    >
                                      View Replies
                                    </span>:<></>}
                                    <span>.</span>
                                    <span
                                      class="font-semibold cursor-pointer"
                                      onClick={() => {
                                        createReply1(
                                          cele?.commentId,
                                          cele?.commentedUserData?.userName
                                        );
                                        setreplyflag(true);
                                      }}
                                    >
                                      Reply
                                    </span>
                                    <span>.</span>
                                    {format(cele?.commentedOn)}
                                  </div>
                                </div>

{console.log("================================>",openreplylist, "==>",cind,commentreplylistfl)}
                                {commentreplylistfl &&
                                openreplylist === cind ? (
                                  <div className="">
                                    {commentreplylistdata &&
                                      commentreplylistdata.map((rele) => (
                                        <>
                                          <div class="bg-gray-100 dark:bg-dark-third p-2 pl-6 rounded-2xl text-sm text-black">
                                            <span class="font-semibold block">
                                              {
                                                rele?.commentedUserData
                                                  ?.userName
                                              } &nbsp;
                                             <span className = "font-normal text-slate-600">
                                             {
                                                rele?.commentedUserData?.emailId
                                              }
                                               </span>
                                            </span>

                                            <span>{rele?.comment}</span>
                                          </div>

                                          <div class="pl-2 text-xs text-gray-500 dark:text-dark-txt flex">

                                          <span
                                      class="font-semibold cursor-pointer"
                                      onClick={() => {
                                        createReply1(
                                          rele?.commentId,
                                          rele?.commentedUserData?.userName
                                        );
                                        setreplyflag(true);
                                      }}
                                    >
                                      Reply
                                    </span> &nbsp;&nbsp;
                                            {/* <span>
                                      <img
                                        src={deleteicon}
                                        alt="delete"
                                        className="h-4 w-4 opacity-30 cursor-pointer"
                                        onClick={() =>
                                        {
                                         
                                          commentdeleteapi(
                                            rele?.commentId,
                                            ele?.postId,
                                            ind
                                          )
                                        }
                                        }
                                      />
                                    </span> */}

                                            {/* <span class="font-semibold cursor-pointer" onClick={()=>{createReply1(cele?.commentId,cele?.commentedUserData?.userName);setreplyflag(true)}}>
                                      Reply
                                    </span>
                                    <span>.</span> */}
                                            {format(rele?.commentedOn)}
                                          </div>
                                        </>
                                      ))}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {!commentcountflag || commentList.length === 0 ? (
                          <div class="py-2 px-4">
                            <div class="flex space-x-2">
                              <div class="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">
                                <input
                                  type="text"
                                  placeholder="Write a comment..."
                                  class="outline-none bg-transparent flex-1 text-black"
                                  onChange={(e) => onChangeComment(e)}
                                  value={commententered}
                                  onKeyPress={(e) =>
                                    handleKeyPress(
                                      e,
                                      ele?.postId,
                                      ind,
                                      parentcommentid,
                                      replyemailid
                                    )
                                  }
                                />

                                {console.log(replyflag,"replyflag")}

                                
                                <div class="flex space-x-0 items-center justify-center">
                                  <img
                                    src={send}
                                    alt="send"
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() => {
                                      if (replyflag) {
                                        createreply(
                                          parentcommentid,
                                        
                                          ele?.postId,
                                          ind
                                        );
                                      } else {
                                        createcomment(ele?.postId, ind);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {openIndex === ind && !comment ? (
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
                ))
              ) : (
                <></>
              )}
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
                 {`Are you sure you want to ${archivebuttonflag ?"DeArchive":"Archive"} this Post?`}
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  onClick={() => {archivebuttonflag ? deleteandarchiveapi("dearchive", datadel):deleteandarchiveapi("archive",datadel)}}
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

