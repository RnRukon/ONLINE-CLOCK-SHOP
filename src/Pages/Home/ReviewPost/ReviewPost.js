import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Avatar, Divider, Typography } from '@mui/material';
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
        <Box className='review-container  py-4'>
            <Container >

                <Divider>
                    <Typography color="secondary" sx={{ textAlign: 'center' }} variant='h4'>
                        Review
                    </Typography>
                </Divider>
                <Box sx={{ flexGrow: 1 }}>

                    <Carousel
                        responsive={responsive}
                        className="py-20 px-1"
                        swipeable={true}
                        draggable={true}
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

                        itemClass="carousel-item-padding-40-px"

                    >

                        {
                            reviews.map((review, index) =>
                                <Box key={index} sx={{ boxShadow: '1px 2px 10px #cee3ff', mx: 2, height: 230, p: 2, borderRadius: 2,cursor:'pointer' }}>

                                    <Box >

                                        <Avatar
                                            height="100px"
                                            src={review?.img ? review?.img : 'https://i.ibb.co/XbsYVtZ/user.png'} alt="" />

                                    </Box>

                                    <Box >
                                        <Typography color="secondary" variant="h6">
                                            {review?.name}
                                        </Typography>
                                        <Typography >
                                            {review?.email}
                                        </Typography>
                                    </Box>
                                    <Divider>
                                        <Typography color="secondary" sx={{ fontWeight: 'bold' }} variant="body2">
                                            Customer Comment
                                        </Typography>
                                    </Divider>
                                    <Box >

                                        <Typography variant="body2">
                                            {review.comment}
                                        </Typography>


                                    </Box>
                                    <Typography>
                                        <Rating name="size-large" readOnly defaultValue={review?.rating} size="large" />
                                    </Typography>
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
