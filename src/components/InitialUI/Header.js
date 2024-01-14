import React from 'react'
import hd from "./Header.module.css"
import Logo from "../../assets/yfl.png"
const Header = () => {
  return (
    <div className={hd.header}>


        <img src = {Logo} alt= "youfitlogo" className={hd.logo}/>

        <ul className={hd.menu}>
            <li>Home</li>
            <li>Programs</li>
            <li>Why us</li>
            <li>Plans</li>
            <li>Testimonials</li>
        </ul>
    </div>
  )
}

export default Header