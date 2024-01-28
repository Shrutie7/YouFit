import { Link, NavLink, useNavigate } from "react-router-dom";
import { links } from "../data";
import { GoAlertFill } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import "./navbar.css";
import Logo from "../assets/yfl.png";
import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

import notification from "../icons/notification.png";
import user from "../icons/user-4-48.png";
import { useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const Navbar = () => {
  const nav = useNavigate();
  const [showoverlay, setshowoverlay] = useState(false);
  const [isNavShowing, setIsNavShowing] = useState(false);
  const { keycloak, initialized } = useKeycloak();
  const handlelogout = () => {
    keycloak.logout({ redirectUri: `${window.location.origin}/` });
  };

  const loginDetails = useSelector((e) => e.logindetails.data);
  console.log(loginDetails);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="bg-black bg-opacity-60 border border-solid border-neutral-100 rounded-md w-auto mt-5 p-">
          <div className="text-white  mt-1">

          <div className="text-xl ml-2">
{loginDetails?.firstName}
          </div>
          <div className="text-lg ml-2">
{loginDetails?.emailId}
          </div>
          <hr className="h-px  my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          
            <div className="cursor-pointer ml-4 mt-2 hover:underline" onClick={()=>{nav("/portal/settings")}}>Settings</div>
            <div className="cursor-pointer ml-4 mt-2 hover:underline">
              Help Center
            </div>
            <div
            className="text-white cursor-pointer ml-4 mt-2 mb-2 hover:underline"
            onClick={() => handlelogout()}
          >
            Sign out
          </div>
          </div>
         
        
        </div>
      </Popover.Body>
    </Popover>
  );
  const handleoverlay = () => {
    setshowoverlay(!showoverlay);
  };
  return (
    <nav>
      <div className="container navtocontainer">
        <Link
          to="/portal/home"
          className="logo"
          onClick={() => setIsNavShowing(false)}
        >
          <img src={Logo} alt="Nav Logo" />
        </Link>

        <ul
          className={`navtolinks ${isNavShowing ? "showtonav" : "hidetonav"}`}
        >
          {links.map(({ name, path }, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active-nav" : "")}
                  onClick={() => setIsNavShowing((prev) => !prev)}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
          <li className="flex gap-4">
        
            <img
              src={notification}
              alt="notification"
              className="cursor-pointer h-6"
            />

         

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose={true}
              className="fixed"
             
            >
              <img
                src={user}
                alt="user"
                className="cursor-pointer h-6"
                onClick={() => handleoverlay()}
              />
            </OverlayTrigger>

  
          </li>
        </ul>
        <button
          className="navtotogglebttn"
          onClick={() => setIsNavShowing((prev) => !prev)}
        >
          {isNavShowing ? <MdOutlineClose /> : <GoAlertFill />}
        </button>


      </div>
    </nav>
  );
};

export default Navbar;
