import React, { useState, useEffect } from 'react'
import sugImg from "../../src/assets/user.svg"

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Ratting from './Ratting';
import megadata from '../assets/megadata.json'
import axios from 'axios';
import Button from '@mui/material/Button';

const History = ({ user, setUser, username, useremail }) => {
    const [histories, setHistories] = useState([]);
    const [results, setResults] = useState([])
    const [show, setShow] = useState(false);

    const [name, setName] = useState('')
    const gethistory = () => {
        axios
            .post("http://localhost:5000/history")
            .then(res => {
                setHistories(res.data)
                setName(histories[0])
            })
            .catch(err => console.warn(err));
    }

    const showhistory = () => {
        // <a href="http://" target="_blank" rel="noopener noreferrer">
        //     <div className="suggested">
        //         <img src={sugImg} alt="" />
        //         <p className='eComm' >Amzon.com</p>
        //         <p className='proDes' >best product under 500rps in ajio only.</p>
        //     </div>
        // </a>
        { console.log('djfl') }

        return (results.map((rec, key = rec.filename) => {
            return (
                <div key={key}>
                    <div className="suggested">
                        {/* {console.log('rec', rec)} */}
                        <div className="imageBox">
                            <img src={rec.Image_URL} alt="" />
                        </div>
                    </div>
                </div>
            )
        }))
    }

    const haha = () => {
        megadata.map((obj) => {
            if (histories.includes(obj.filename)) {
                results.push(obj)
            }
            return 1
        })
        setShow(true)
    }

    useEffect(() => {
        gethistory()
    }, [])

    // useEffect(() => {
    //     setShow(true)
    // }, [histories])


    return (
        <>
            <div className="rpfileSec container">
                <div className="name">
                    <h1>Hey {username}</h1>
                    {/* <h2>First Name : {name.split(' ')[0]}</h2>
                    <br></br>
                    <h2>Last Name : {name.split(' ')[1]}</h2> */}
                    <br></br>
                    <h2>Email : {useremail}</h2>
                </div>
                {/* <button>Edit your profile</button> */}
            </div>
            {/* <Ratting /> */}
            <Button variant="contained" color="secondary" className='hisButton' onClick={haha} >show history</Button>
            <div className="recommondation">
                {show && showhistory()}
            </div>
        </>
    )
}

export default History