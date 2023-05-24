import React from 'react'
import homeimg from "../../assets/whywe.svg"
const Homewhy = () => {
    return (
        <div className='container homeWhy' >
            <h1>Why Us ?</h1>
            <div className="whySection">
                <div className="introText">
                    <p>We allow customers to find the <span className='backColor' > products they need and are relevant </span>to them quickly and easily</p> <br />
                    <p className="p2">The items generated are personalized according to the individual's browse and purchase behavior and product information (such as product inventory)</p>
                </div>
                <div className="illustration">
                    <img src={homeimg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Homewhy