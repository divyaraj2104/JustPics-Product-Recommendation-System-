import React from 'react'
import insta from "../assets/social/instagram.svg"
import fb from "../assets/social/facebook.svg"
import ln from "../assets/social/linkedin.svg"
import call from "../assets/social/phone-call.png"
import mail from "../assets/social/email.png"
import logo from "../assets/Logo.svg"
import arrow from "../assets/social/arrow.svg"
import { NavLink } from 'react-router-dom'


const Footer = () => {
    return (
        <footer className='container' >
            <div className="footerMain">
                <div className="footerBox inTouch">
                    <h1>Get In Touch</h1>
                    <div className="mail">
                        <a href="mailto:gmail.com"> <img src={mail} alt="" /> hello@xyz.com</a>
                    </div>
                    <div className="cellNo">
                        <a href="tel:+919913054473"> <img src={call} alt="" /> +91 9913054473</a>
                    </div>
                    <div className="socialIcon">
                        <a href="https://www.facebook.com/" target="_blank" >
                            <img src={fb} alt="" />
                        </a>
                        <a href="https://instagram.com/" target="_blank">
                            <img src={insta} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/" target="_blank">
                            <img src={ln} alt="" />
                        </a>


                    </div>
                </div>
                <div className="footerBox logoDetails ">
                    <div className="logoName">
                        <h1> <img src={logo} alt="" /> JustPics</h1>
                    </div>
                    <p>Just Pics<br />
                        Vallabh Vidhyanagar, Anand-388120, Gujarat </p>
                </div>
                <div className="footerBox links">
                    <div className="homeLink">
                        <NavLink to="/" > Home <img src={arrow} alt="" /></NavLink>
                    </div>
                    {/* <div className="homeLink">
                        <NavLink to="/about" >About Us <img src={arrow} alt="" /></NavLink>
                    </div> */}
                    <div className="homeLink">
                        <NavLink to="/service" >Get Recommendations <img src={arrow} alt="" /></NavLink>
                    </div>
                    {/* <div className="homeLink">
                        <NavLink to="/contact" >Contact Us <img src={arrow} alt="" /></NavLink>
                    </div> */}
                </div>
            </div>
            <div className="rights">
                {new Date().getFullYear()} | Designed by justpics
                {/* develop by Yash Ghori (https://github.com/yashghori) */}
            </div>
        </footer>
    )
}

export default Footer