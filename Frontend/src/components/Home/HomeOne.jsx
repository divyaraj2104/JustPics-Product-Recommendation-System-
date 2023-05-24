import React from 'react'
import homeimg from "../../assets/searching.svg"
import arrow from "../../assets/arrow.svg"
import { NavLink } from 'react-router-dom'

const HomeOne = ({ user }) => {
    return (
        <div className='container homeone'>
            <div className="illustration">
                <img src={homeimg} alt="" />
            </div>
            <div className="introText">
                <p> Systems that aim to predict users' interests and <span className='backColor' > recommend product items </span> that quite likely are interesting for them. </p>
                <br />
                <p className='p2'> Filtering system that seeks to predict and show the items that a user would like to purchase.</p>
                <br />
                {console.log(user)}
                {user ? <NavLink to="/service" > Get started <img src={arrow} alt="" /></NavLink> : <NavLink to="/login" > Get started <img src={arrow} alt="" /></NavLink>}
            </div>
        </div>
    )
}

export default HomeOne