import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import logo from "../assets/Logo.svg"
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Login = ({ user, setUser, username, setusername, setUseremail }) => {

    const [password, setpassword] = useState('');
    const [profileres, setProfileres] = useState()
    const navigate = useNavigate()


    const checkLogin = async () => {
        const formData = new FormData();
        // formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        // console.log(formData)

        axios.post("http://localhost:5000/login", formData)
            .then(res => { setProfileres(res.data.user); setUseremail(res.data.email) })

            .catch(err => console.warn("err", err));
    };
    const redirect = () => {
        if (profileres === 'correct') {
            navigate('/service')
            setUser(true)
            console.log(user)
        }
        else if (profileres === 'None') {
            navigate('/signin')
            alert('There is no such User exist please Register yourself')
        }
        else if (profileres === 'incorrect')
            alert('Your Password is incorrect. Please try again')
    }

    useEffect(() => {
        redirect();
    }, [profileres])

    return (
        <>

            <div className='login'>
                <div className="lognBox">
                    <div className="logoBox">
                        <NavLink to="/"><img src={logo} alt="" /> <h1> JustPics</h1></NavLink>
                    </div>
                    <TextField required id="standard-basic" label="Username" variant="standard" color="secondary" margin="normal" onChange={(e) => { setusername(e.target.value) }} />
                    <TextField required id="standard-basic" type='password' label="Password" variant="standard" color="secondary" margin="normal" onChange={(e) => { setpassword(e.target.value) }} />
                    <Button variant="contained" color="secondary" onClick={checkLogin} >login</Button>
                    <p>Don't have an account? <NavLink to="/signin"> SignUp </NavLink></p>
                    {/* <p>Don't remember password? <NavLink to="/forgot"> forgotpassword </NavLink></p> */}
                </div>
            </div>
        </>

    )
}

export default Login