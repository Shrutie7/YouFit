import { Link, NavLink } from "react-router-dom"
import { links } from "../data"
import { GoAlertFill } from "react-icons/go"
import { MdOutlineClose } from "react-icons/md"
import "./navbar.css"
import Logo from "../assets/yfl.png"
import { useState } from "react"
import { useKeycloak } from "@react-keycloak/web"
import logout from "../assets/icons8-logout-24.png"

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const { keycloak, initialized } = useKeycloak();
  const handlelogout=() => {
    keycloak.logout({ redirectUri: `${window.location.origin}/` });

  }
  return (
    <nav>
      <div className="container navtocontainer">
        <Link to="/portal/home" className="logo" onClick={() => setIsNavShowing(false)}>
          <img src={Logo} alt="Nav Logo" />
        </Link>
        <ul className={`navtolinks ${isNavShowing ? 'showtonav' : 'hidetonav'}`}>
          {
            links.map(({ name, path }, index) => {
              return (
                <li key={index}>
                  <NavLink to={path} className={({ isActive }) => isActive ? 'active-nav' : ''}onClick={() => setIsNavShowing(prev => !prev)}>
                    {name}
                  </NavLink>
                </li>
              )
            })
          }
        <li><img src={logout} alt="logout" onClick={()=>handlelogout()} className="cursor-pointer"/></li>  
        </ul>
        <button className="navtotogglebttn" onClick={() => setIsNavShowing(prev => !prev)}>
          {
            isNavShowing ? <MdOutlineClose /> : <GoAlertFill />
          }
        </button>
      </div>
    </nav>
  )
}

export default Navbar