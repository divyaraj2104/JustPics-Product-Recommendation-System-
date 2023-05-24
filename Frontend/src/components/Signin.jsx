import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import logo from "../assets/Logo.svg"
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signin = () => {

    const [email, setemail] = useState(null);
    const [username, setusername] = useState(null);
    const [password, setpassword] = useState(null);
    const [fname, setfname] = useState(null);
    const [lname, setlname] = useState(null);

    const navigate = useNavigate()


    const adduser = async () => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("fname", fname);
        formData.append("lname", lname);
        console.log(formData)

        axios
            .post("http://localhost:5000/adduser", formData)
            .then(res => console.log(res))
            .catch(err => console.warn(err));
        navigate('/login')
    };


    return (
        <>
            <div className='login'>
                <div className="lognBox">
                    <div className="logoBox">
                        <NavLink to="/" > <img src={logo} alt="" /> <h1> JustPics</h1> </NavLink>
                    </div>
                    <TextField required id="standard-basic" label="Email" variant="standard" color="secondary" margin="normal" onChange={(e) => { setemail(e.target.value) }} />
                    <TextField required id="standard-basic" label="Mobile Number" variant="standard" color="secondary" margin="normal" onChange={(e) => { setemail(e.target.value) }} />
                    <TextField required id="standard-basic" label="First Name" variant="standard" color="secondary" margin="normal" onChange={(e) => { setfname(e.target.value) }} />
                    <TextField required id="standard-basic" label="Last Name" variant="standard" color="secondary" margin="normal" onChange={(e) => { setlname(e.target.value) }} />
                    <TextField required id="standard-basic" label="Username" variant="standard" color="secondary" margin="normal" onChange={(e) => { setusername(e.target.value) }} />
                    <TextField required id="standard-basic" type="password" label="Password" variant="standard" color="secondary" margin="normal" onChange={(e) => { setpassword(e.target.value) }} />
                    <Button variant="contained" color="secondary" margin="normal" onClick={adduser}>Create</Button>
                    <p>Alredy have an account? <NavLink to="/login"> login </NavLink></p>
                </div>
            </div>
        </>
    )
}

export default Signin