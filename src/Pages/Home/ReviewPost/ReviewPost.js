import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import './ReviewPost.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const ReviewPost = (props) => {
    const [reviews, setReviews] = useState([]) || '';

    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [setReviews])




    return (
        <Box className='review-container py-4'>
            <Container >
                <Typography color="secondary" className='underline' variant='h4'>
                    Review
                </Typography>
                <Box sx={{ flexGrow: 1 }}>

                    <Carousel
                        responsive={responsive}
                        className="py-20 px-1"
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={props.deviceType !== "mobile" ? true : false}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={2000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"

                    >

                        {
                            reviews.map(review =>


                                <Box className='m-2' key={review._id}>
                                    <Paper className=''>
                                        <Box className="d-flex">
                                            <Box className=" ">
                                                <Box className="border border-r-2">
                                                    <Box sx={{ mt: -2, ml: -2 }}>
                                                        <img style={{ width: '80px' }} className="rounded-pill" src={review.img ? review.img : 'https://i.ibb.co/XbsYVtZ/user.png'} alt="" />
                                                    </Box>
                                                    <Box sx={{ p: 1 }}>
                                                        <Typography color="secondary" variant="h6">
                                                            {review.name}
                                                        </Typography>
                                                        <Typography className="fw-bold text-green-500">
                                                            {review.email}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box className="">
                                                <Typography color="secondary" className="underline" sx={{ fontWeight: 'bold' }} variant="body2">
                                                    Customer Comment
                                                </Typography>
                                                <Typography variant="body2">
                                                    {review.comment}
                                                </Typography>
                                                <Typography >
                                                    <Rating name="size-large" readOnly defaultValue={review.rating} size="large" />
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>


                            )
                        }
                    </Carousel>;


                </Box>

            </Container >
        </Box>
    );
};

export default ReviewPost;
