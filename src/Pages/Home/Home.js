import { Grid } from '@mui/material';
import React from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../Sheard/Banner/Banner';
import Footer from '../Sheard/Footer/Footer';
import Navigation from '../Sheard/Navigation/Navigation';
import Features from './Features';
import HomeProducts from './HomeProducts/HomeProducts';
import RequestToday from './RequestToday/RequestToday';

import ReviewPost from './ReviewPost/ReviewPost';






const Home = () => {
    return (
        <>
            <Navigation></Navigation>
            <Banner></Banner>
            <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} >
                    <Grid item xs={12} sm={8} md={8}>
                        <HomeProducts></HomeProducts>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                       <Features/>
                    </Grid>
                </Grid>
            <ReviewPost></ReviewPost>
            <RequestToday></RequestToday>
            </Container>
            <Footer></Footer>

        </>
    );
};

export default Home;