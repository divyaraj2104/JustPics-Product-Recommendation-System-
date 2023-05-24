import React from 'react'
import homeimg from "../../assets/user.svg"
import correct from "../../assets/correct.png"

const HomwHow = () => {
    return (
        <div className='container homwhow'>
            <h1>How to use ?</h1>
            <div className="HowSection">
                <div className="illustration">
                    <img src={homeimg} alt="" />
                </div>
                <div className="introText">
                    <ul>
                        <li> <img src={correct} alt="" /> Log in to Justpics. </li>
                        <li> <img src={correct} style={{ width: "45px" }} alt="" /> In case you are our customers you will get Recomandations simmilar to your image.</li>
                        <li> <img src={correct} style={{ width: "45px" }} alt="" /> If you are new User then SignUp to make an account and get Recomandations based on your input   .</li>
                        <li> <img src={correct} alt="" /> Happy scrolling!</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default HomwHow