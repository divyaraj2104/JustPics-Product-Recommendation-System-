import React from 'react'
import Footer from '../components/Footer'
import HomeOne from '../components/Home/HomeOne'
import Homewhy from '../components/Home/Homewhy'
import HomeHow from '../components/Home/HomeHow'

const Home = ({ user }) => {
    return (
        <>
            <HomeOne user={user} />
            <Homewhy />
            <HomeHow />
            <Footer />
        </>
    )
}

export default Home