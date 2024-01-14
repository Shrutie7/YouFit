import React from "react";
import fo from "./Footer.module.css";
import github from "../../assets/github.png";
import instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";
import Logo from "../../assets/yfl.png";

const Footer = () => {
  return (
    <div className={fo.footercontainer}>
      <hr />
      <div className={fo.footer}>
        <div className={fo.socialLinks}>
          <img src={github} alt="" />
          <img src={instagram} alt="" />
          <img src={LinkedIn} alt="" />
        </div>
   

      <div className={fo.logof}>
        <img src={Logo} alt="" />
        </div>
      </div>

      <div className={`${"blur"} ${fo.blurf1}`}></div>
      <div className={`${"blur"} ${fo.blurf2}`}></div>
    </div>
  );
};

export default Footer;
