import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import close from "../assets/navIcon/close.svg"
import menu from "../assets/navIcon/menu.svg"


import logo from "../assets/Logo.svg"
const Navbar = ({ user, username, setUser }) => {
    // open and close navbar
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="container nav" >
            <div className="Navlogo">
                <NavLink to="/">
                    <img src={logo} alt="" />
                </NavLink>
                <NavLink to="/"><h1>JusPics</h1></NavLink>
            </div>
            <div className="NavItems desktop">
                <li><NavLink to="/">Home</NavLink></li>
                {user ? <li><NavLink to="/service">Get Recommendations</NavLink></li> : <></>}

                <li className='doubleLi'>
                    {user ? <li><NavLink className='doubleLi' to="/login">{username}</NavLink></li> : <li><NavLink className='doubleLi' to="/login">login/signup</NavLink></li>}
                    {user ? <div className="drpdown">
                        <li><NavLink to="/history">Profile</NavLink></li>
                        <li><NavLink to="/#" onClick={() => { setUser(!user) }}>logout</NavLink></li>
                    </div> : <></>}

                </li>


            </div>
            <div className="mobile">
                <div onClick={() => { setIsOpen(!isOpen) }} className="menuIcon"><img src={menu} alt="" /></div>
                {isOpen ? <>
                    <div className="NavItems mobileItem">
                        <p onClick={() => { setIsOpen(!isOpen) }} ><img src={close} alt="" /></p>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/">Our Service</NavLink></li>
                        <li>
                            {user ? <li><NavLink to="/login">{username}</NavLink></li> : <li><NavLink to="/login">login/signup</NavLink></li>}
                            <li>History</li>
                            <li>log out</li>
                        </li>
                    </div>
                </> : <></>}
            </div>
        </nav>
    )
}

export default Navbar