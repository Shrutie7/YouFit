import React, { useRef, useState } from "react";
import post from "../../assets/post/3.jpeg";
import heart from "../../assets/heart.png"
import chat from "../../assets/speech-bubble.png";
import send from "../../assets/send-message.png"
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import sh from "./Feed.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const descRef = useRef();
  const loginDetails = useSelector((e)=>e.logindetails.data);
  console.log(loginDetails);
  const [file, setFile] = useState(null);
  const [comment,setcomment] = useState(false);
  const nav = useNavigate();
  return (
    <div>
      <div class="dark:font-sans">
        <div class="flex justify-center h-5/6 font-sans">
          <div class="w-1/5 mt-20  hidden xl:flex flex-col fixed top-0 left-0 ">
            <ul class="p-4 space-y-3">
              <li className="flex items-center gap-x-3.5 py-4 px-2.5 bg-gray-100 text-sm text-slate-700  rounded-lg hover:bg-gray-400 dark:bg-white dark:text-lg dark:font-semibold font-sans dark:cursor-pointer dark:text-black dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Explore
              </li>
              <li className="flex items-center gap-x-3.5 py-4 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-400 dark:bg-white dark:text-lg font-semibold font-sans dark:cursor-pointer dark:text-black dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={()=>nav("/portal/settings")}>
                Settings
              </li>
              <li className="flex items-center gap-x-3.5 py-4 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-400 dark:bg-white dark:text-lg font-semibold font-sans dark:cursor-pointer dark:text-black dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={()=>nav("/portal/trainers")}>
                More Trainers
              </li>
            </ul>
          </div>

          <div class="w-full mt-4 lg:w-2/3 xl:w-3/5 pt-32 lg:pt-16 px-2">
            {parseInt(loginDetails?.roleId) === parseInt(3) ? <div class="px-4 mt-4 shadow rounded-lg bg-white">
              <div class="p-2 border-b border-gray-300">
                <input
                  placeholder={`Whats on your mind ${loginDetails.firstName} ?`}
                  className={sh.shareInput}
                  ref={descRef}
                ></input>

                <hr className={sh.shareHr}></hr>
                {file && (
                  <div className={sh.shareImgContainer}>
                    {/* URL.createObjectURL allows us to create pseudo url to view file before uploading  */}
                    <img
                      className={sh.shareImg}
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
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
                  ></PermMedia>
                  <span className={sh.shareOptionText}>Photo or Video</span>
                  {/* to upload only 1 file at a time e.target.files[0]*/}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                <div className={sh.shareOption}>
                  <Label htmlColor="blue" className={sh.shareIcon}></Label>
                  <span className={sh.shareOptionText}>Tag</span>
                </div>
                <div className={sh.shareOption}>
                  <Room htmlColor="green" className={sh.shareIcon}></Room>
                  <span className={sh.shareOptionText}>Location</span>
                </div>
                <div className={sh.shareOption}>
                  <EmojiEmotions
                    htmlColor="goldenrod"
                    className={sh.shareIcon}
                  ></EmojiEmotions>
                  <span className={sh.shareOptionText}>Feelings</span>
                </div>
              </div>
              <button className={sh.shareButton} type="submit">
                Share
              </button>
            </div>:<></>}

            <div>
              <div class="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
                <div class="flex items-center justify-between px-4 py-2">
                  <div class="flex space-x-2 items-center">
                    {/* <div class="relative">
                      <img
                        src="./images/avt-2.jpg"
                        alt="Profile picture"
                        class="w-10 h-10 rounded-full"
                      />
                      <span class="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                    </div> */}
                    <div>
                      <div class="font-semibold text-black">John Doe</div>
                      {/* <span class="text-sm text-gray-500">38m ago</span> */}
                    </div>
                  </div>
                  <div class="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-black dark:hover:bg-dark-third rounded-full cursor-pointer">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>

                <div class="text-justify px-4 py-2 text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, autem earum cum ullam odio, molestias maxime
                  aperiam in id aspernatur vel ratione odit molestiae minus ipsa
                  obcaecati quia! Doloribus, illum.
                </div>

                <div class="py-2">
                  <img src={post} alt="Post image" className="max-h-96" />
                </div>

                <div class="px-4 py-1">
                  <div class="flex items-center justify-between">
                    <div class="flex flex-row-reverse items-center">
                      <span class="ml-2 text-gray-500 dark:text-dark-txt flex gap-3">
                        <img src={heart} alt="like" className="h-8 w-8 cursor-pointer"/>
                        <img src={chat} alt="chat" className="h-9 w-8 cursor-pointer" onClick={()=>{setcomment(!comment)}}/>
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
                      <span>90 Comments  </span>
                      <span> 66 Likes</span>
                    </div>
                  </div>
                </div>


{comment ? <div className="h-44 overflow-scroll">
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </span>
                      </div>
                      <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                        <span class="font-semibold cursor-pointer">Like</span>
                        <span>.</span>
                        <span class="font-semibold cursor-pointer">Reply</span>
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
                            <span class="font-semibold block">John Doe</span>
                            <span>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
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
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. In voluptate ipsa animi corrupti unde,
                          voluptatibus expedita suscipit, itaque, laudantium
                          accusantium aspernatur officia repellendus nihil
                          mollitia soluta distinctio praesentium nulla eos?
                        </span>
                      </div>
                      <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                        <span class="font-semibold cursor-pointer">Like</span>
                        <span>.</span>
                        <span class="font-semibold cursor-pointer">Reply</span>
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
                            <span class="font-semibold block">John Doe</span>
                            <span>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
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
                        <img src={send} alt="send" className="h-5 w-5 cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>

                </div>:<></>}
              </div>
              <div class="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
                <div class="flex items-center justify-between px-4 py-2">
                  <div class="flex space-x-2 items-center">
                    {/* <div class="relative">
                      <img
                        src="./images/avt-2.jpg"
                        alt="Profile picture"
                        class="w-10 h-10 rounded-full"
                      />
                      <span class="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                    </div> */}
                    <div>
                      <div class="font-semibold text-black">John Doe</div>
                      {/* <span class="text-sm text-gray-500">38m ago</span> */}
                    </div>
                  </div>
                  <div class="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-black dark:hover:bg-dark-third rounded-full cursor-pointer">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>

                <div class="text-justify px-4 py-2 text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, autem earum cum ullam odio, molestias maxime
                  aperiam in id aspernatur vel ratione odit molestiae minus ipsa
                  obcaecati quia! Doloribus, illum.
                </div>

                <div class="py-2">
                  <img src={post} alt="Post image" className="max-h-96" />
                </div>

                <div class="px-4 py-1">
                  <div class="flex items-center justify-between">
                    <div class="flex flex-row-reverse items-center">
                      <span class="ml-2 text-gray-500 dark:text-dark-txt flex gap-3">
                        <img src={heart} alt="like" className="h-8 w-8 cursor-pointer"/>
                        <img src={chat} alt="chat" className="h-9 w-8 cursor-pointer" onClick={()=>{setcomment(!comment)}}/>
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
                      <span>90 Comments  </span>
                      <span> 66 Likes</span>
                    </div>
                  </div>
                </div>


{comment ? <div className="h-44 overflow-scroll">
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </span>
                      </div>
                      <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                        <span class="font-semibold cursor-pointer">Like</span>
                        <span>.</span>
                        <span class="font-semibold cursor-pointer">Reply</span>
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
                            <span class="font-semibold block">John Doe</span>
                            <span>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
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
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. In voluptate ipsa animi corrupti unde,
                          voluptatibus expedita suscipit, itaque, laudantium
                          accusantium aspernatur officia repellendus nihil
                          mollitia soluta distinctio praesentium nulla eos?
                        </span>
                      </div>
                      <div class="p-2 text-xs text-gray-500 dark:text-dark-txt">
                        <span class="font-semibold cursor-pointer">Like</span>
                        <span>.</span>
                        <span class="font-semibold cursor-pointer">Reply</span>
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
                            <span class="font-semibold block">John Doe</span>
                            <span>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
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
                        <img src={send} alt="send" className="h-5 w-5 cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>

                </div>:<></>}
              </div>
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
    </div>
  );
};

export default Feed;
