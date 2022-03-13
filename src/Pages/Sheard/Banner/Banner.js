import React from 'react';
import './Banner.css'
import { Button } from '@mui/material'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Banner = () => {


    return (
        <Carousel className="mt-5">
            <Carousel.Item interval={1000}>
                <img
                    className="d-block "
                    src="https://i.ibb.co/5RgpkzV/rsz-5366917.jpg"
                   
                    alt="First slide"
                />
                <Carousel.Caption >
                    <h3 className="  fw-bold"> Clock Online Shop</h3>
                    <p> Clock Online Shop</p>
                    <Link to="/products"> <Button color="secondary" size="small" variant="contained">Explore </Button></Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block"
                    src="https://i.ibb.co/3sRp7WJ/rsz-2950400.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption style={{backgroundColor:'#000000a3'}}>
                    <h3> Clock Online Shop</h3>
                    <p> Clock Online Shop.</p>
                    <Link to="/products"> <Button color="secondary" size="small" variant="contained">Explore </Button></Link>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block "
                    src="https://i.ibb.co/F4kkymx/rsz-356403-clock-wallpaper-for-desktop.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption style={{backgroundColor:'#000000a3'}}>
                    <h3> Clock Online Shop</h3>
                    <p>Unique Porcelain Collection</p>
                    <Link to="/products"> <Button color="secondary" size="small" variant="contained">Explore </Button></Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;

// Premier Pottery Retailer
// Unique Porcelain Collection