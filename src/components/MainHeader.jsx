import { Link, useNavigate } from "react-router-dom"
import Image from "../images/main_header.png"
import post from "../assets/post/1.jpeg"
import backgroundvideo1 from "../assets/video1.mp4"
import backgroundvideo2 from "../assets/video (2160p).mp4"
import backgroundvideo3 from "../assets/video (2160p) (2).mp4"
import Carousel from "./Carousel"

const MainHeader = () => {

  const nav = useNavigate();
  const slides = [backgroundvideo1, backgroundvideo2, backgroundvideo3];
  return (
    <div className="pt-[30%] bg-black md:pt-0 ">

<div className="z-50 pt-[27%] aspect-video absolute text-white bg-gradient-to-r from-black px-6 md:px-20">
      <div className="pb-5">
      <h1 className="text-3xl md:text-6xl font-bold">Welcome to YouFit GYMS </h1>

      {/* <img src={"https://image.tmdb.org/t/p/w185"+poster_path} className="h-44 w-80"></img> */}
      <p className="hidden md:inline-block py-6 text-lg w-2/4">Join the Legends Of The Fitness World</p>

      <div className="flex my-5 md:m-0">
        <div className="flex ">
          <button className="bg-white text-black text-xl flex rounded-md hover:bg-opacity-80 py-2 md:py-3 px-9" onClick={()=>nav("/portal/plans")}>
            
            Get Started
          </button>
        </div>

      </div>
      </div>
  
    </div>

    <div className="w-screen">
      {/* <iframe
       
       className="w-full aspect-video"
        src={"https://www.youtube.com/embed/YOeLOjOzMcw?si=SLQ-WvXKskJjDDXR"  + "?&autoplay=1&mute=1&loop=1&rel=0&amp&controls=0"}
        
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe> */}


     <Carousel autoslide={true}>
                  {slides.map((s) => (
                    <video autoPlay loop muted id ="video" className="w-full aspect-video ">
  <source src={s} type="video/mp4"/>
</video>
                  ))}
                </Carousel>


    </div>
          {/* <img src = {post} alt = "img" className="-z-10"/> */}
      {/* <div className="container maintoheader-container"> */}

        {/* <div className="maintoheader-left">
 
          <h4>#100DaysOfWorkOut</h4>
          <h1>Join The Legends Of The Fitness World</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Sit amet justo donec enim diam. Enim nulla aliquet porttitor lacus.
          </p>
          <Link to="/portal/plans" className="bttn lg">Get Started</Link>
        </div> */}
        {/* <div className="maintoheader-right">
          <div className="maintoheader-circle"></div>
          <div className="maintoheader-image"> */}
            {/* <img src={Image} alt="Header Main Image" /> */}
          {/* </div>
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default MainHeader