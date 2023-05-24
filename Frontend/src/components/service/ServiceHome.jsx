import React from 'react'
import { useState, useEffect } from "react";
import upload from "../../assets/upload.png"
import searching from "../../assets/search.svg"
import axios from 'axios'
import megadata from '../../assets/megadata.json'
import Ratting from '../Ratting';
import searchh from "../../assets/searchh.svg"


const ServiceHome = () => {
    const [img, setImg] = useState();
    const [recs, setRecs] = useState([]);
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [picUp, setPicUp] = useState(true)

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setSelectedImage(file)
        setImg(URL.createObjectURL(file));
    };

    useEffect(() => {
        haha()
    }, [recs, show])

    const haha = () => {
        megadata.map((obj) => {
            if (recs.includes(obj.filename)) {
                results.push(obj)
            }
            return 1
        })
        // console.log('res1', results)
        setLoading(false)

        setShow(true)
    }

    const uploadFile = async (e) => {
        e.preventDefault();
        setResults([])
        setRecs([])
        setLoading(true)
        setPicUp(false)

        const formData = new FormData();


        formData.append("files", selectedImage);

        let res = await axios.post("http://localhost:5000/upload", formData)
        setRecs(res.data)
        // console.log('recs', recs)
        haha()
    };

    const showSearch = () => {
        return (<div className="uploadIcon" onClick={uploadFile}>
            <img src={searching} alt="" />Recommend
        </div>)
    }

    const showRecs = () => {
        // haha()
        // console.log('recccc', results)
        return (results.map((rec, key = rec.filename) => {
            return (
                <div key={key}>
                    <a href={rec.Product_URL} target="_blank" rel="noopener noreferrer">
                        <div className="suggested">
                            {/* {console.log('rec', rec)} */}
                            <div className="imageBox">
                                <img src={rec.Image_URL} alt="" />
                            </div>
                            <p className='brand' >{rec.Brand}</p>
                            <p className='eComm' >₹{rec.Discount_Price} <span> ₹{rec.Original_Price}</span></p>
                        </div>
                    </a>
                </div>
            )
        }))
    }

    return (
        <div className='servicePage' >
            <div className="uploadImage" >
                <div className="imgContainer">
                    <img className='searchImg' src={img} alt="" />
                    <input type="file" onChange={onImageChange} />
                    <div className="uploadIcon">
                        <img src={upload} alt="" />Upload
                    </div>
                    <br></br>
                    {selectedImage && showSearch()}
                </div>
            </div>
            {picUp ? <div className='searchh' ><p>Upload image to get best product recommendation</p><img src={searchh} alt="" srcset="" /> </div> : <div className="recSection">
                {loading ? "" : <center>
                    <p className='visualMatch' >Visual matches</p>
                </center>}
                <br></br>
                {console.log("ii")}
                {console.log(selectedImage)}
                {loading && <center>
                    <p className='visualMatch' >Finding Recomandations For You ...</p>
                </center>}

                <div className="recommondation">
                    {show && showRecs()}
                    {loading ? "" : <Ratting />}
                </div>
            </div>}

        </div>
    )
}

export default ServiceHome