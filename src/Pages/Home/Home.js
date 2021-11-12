import React from 'react';
import Banner from '../Sheard/Banner/Banner';
import Footer from '../Sheard/Footer/Footer';
import Navigation from '../Sheard/Navigation/Navigation';
import HomeProducts from './HomeProducts/HomeProducts';
import PorterToday from './PorterToday/PorterToday';
import ReviewPost from './ReviewPost/ReviewPost';






const Home = () => {
    return (
        <>
            <Navigation></Navigation>
            <Banner></Banner>
            <HomeProducts></HomeProducts>
            <ReviewPost></ReviewPost>
            <PorterToday></PorterToday>
            <Footer></Footer>

        </>
    );
};

export default Home;