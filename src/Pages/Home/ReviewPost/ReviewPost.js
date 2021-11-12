import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import './ReviewPost.css'

const ReviewPost = () => {
    const [reviews, setReviews] = useState([]) || '';

    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [setReviews])



    const Grid = styled(MuiGrid)(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& [role="separator"]': {
            margin: theme.spacing(0, 1),
        },
    }));
    return (
        <Box className='review-container py-4'>
            <Container >
                <Typography color="secondary" className='underline' variant='h4'>
                    Review
                </Typography>
                <Box className="py-20" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        {
                            reviews.map(review =>


                                <Grid item xs={12} sm={4} md={4} key={review._id}>
                                    <Paper>
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
                                </Grid>


                            )
                        }
                    </Grid>
                </Box>

            </Container >
        </Box>
    );
};

export default ReviewPost;
