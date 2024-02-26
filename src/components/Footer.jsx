import { Link } from "react-router-dom"
import Logo from "../assets/yfl.png"
import { FaLinkedin, FaFacebookF } from "react-icons/fa"
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai"

const Footer = () => {
  return (
    <footer>
      <div className="container footertocontainer">
        <article>
          <Link to="/" className="logo">
            <img src={Logo} alt="Footer Logo" />
          </Link>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Sit amet justo donec enim diam. Enim nulla aliquet porttitor lacus.
          </p> */}
          <div className="footertosocials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener"><FaLinkedin /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer noopener"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer noopener"><AiOutlineTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener"><AiFillInstagram /></a> 
          </div>
        </article>
        <article>
          <h4>Permalinks</h4>
          
          <Link to="/portal/plans">Plans</Link>
          <Link to="/portal/trainers">Trainers</Link>
          <Link to="/portal/feedback">Feedback</Link>
          <Link to="/portal/feed">Feed</Link>
        </article>
        <article>
          <h4>Schedules</h4>
          <Link to="/portal/classes">Classes</Link>
          <Link to="/portal/feed">Feed</Link> 
          <Link to="/portal/home">FAQs</Link>
        </article>
        <article>
          <h4>Settings</h4>
          <Link to="/portal/settings">User Settings</Link>
          
        </article>
      </div>
      <div className="footertocopyright">
        <small>2024 YOUFIT GYMS &copy; All Right Reserverd</small>
      </div>
    </footer>
  )
}

export default Footer
