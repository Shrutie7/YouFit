import React from "react";
import search from "../icons/search.png";
import usericon from "../icons/usericon.png";
import alert from "../icons/alert.png";
import create from "../icons/create.png";
import hamburger from "../icons/hamburger.png";
import youtubeicon from "../icons/youtubeicon.jpg";
import { useKeycloak } from "@react-keycloak/web";

const Head = () => {
  const { keycloak, initialized } = useKeycloak();
  const handlelogout=() => {
    keycloak.logout({ redirectUri: `${window.location.origin}/` });

  }
  return (
    <div className="flex h-20 justify-around items-center border-solid border-red-50 border-2">
      {/* 3 sections - hamburger + logo , search , userinfo section */}
      <div className="flex h-14 gap-3 ">
        <img src={hamburger} alt="hamburger" className="h-10 w-10 mt-1" />

        <img src={youtubeicon} alt="Youtube-logo" className="w-32 h-28 -mt-8  " />
      </div>

      <div className="flex ml-8">
        <img
          src={search}
          alt="search"
          className="h-6 w-6 absolute ml-3 mt-3 z-50"
        />
        <input
          type="text"
          placeholder="Search"
          className="relative h-12 px-12 w-[920px] border-solid border-black border-2 rounded-s-3xl placeholder:font-semibold text-lg font-sans"
        />
        <div className="w-20 rounded-e-3xl border-solid border-black border-2">
        <img src={search} alt="search" className="ml-4 pt-2 h-8 w-8 cursor-pointer" />
        </div>
       
      </div>

      <div className="flex gap-5">
        <img src={create} alt="create-icon" className="h-10 w-10" />
        <img src={alert} alt="alert-icon" className="h-10 w-10" />
        <img src={usericon} alt="user-icon" className="h-10 w-10 cursor-pointer" onClick={()=>handlelogout()}/>
      </div>
    </div>
  );
};

export default Head;
