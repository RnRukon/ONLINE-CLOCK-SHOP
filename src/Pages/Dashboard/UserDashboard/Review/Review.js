import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import useAuth from '../../../../Hooks/useAuth';
import { Box } from '@mui/system';
const Review = () => {
    const [reviewData, setReviewData] = useState({});
    const [success, setSuccess] = useState(false);
    const { isLoading, user } = useAuth();


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...reviewData }
        newProductData[field] = value;
        setReviewData(newProductData)


    }

    const handleReviewPost = (e) => {
        reviewData.name = user.displayName;
        reviewData.email = user.email;
        reviewData.img = user.photoURL;
        if (reviewData.rating > 5) {
            return alert('Please Type the maximum rating 5');
        }
        fetch('https://evening-woodland-47343.herokuapp.com/review', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.modifiedCount) {
                setSuccess(true)
                // }
            })

        e.preventDefault();
        e.target.reset();
    }
    return (
        <div>
            <Typography color="secondary" variant='h4'>
                Review
            </Typography>

            <Box className="row">
                <Grid className="col-lg-6" >
                    {
                        isLoading ? <LinearProgress /> :
                            <form onSubmit={handleReviewPost}>

                                <TextField
                                    color="secondary"
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-required"
                                    label="Write uer Comment"
                                    variant="standard"
                                    name="comment"
                                    onBlur={handleOnBlur}

                                /><br />
                                <TextField
                                    color="secondary"
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-required"
                                    label="Rating"
                                    variant="standard"
                                    name="rating"
                                    type="number"
                                    onBlur={handleOnBlur}
                                /> <br />

                                <Button color="warning" sx={{ width: 1, mt: 5 }} type="submit" className="feature-button" variant="contained">Review</Button>
                            </form>
                    }

                    {
                        success && <Alert severity="success">
                            <AlertTitle>Review</AlertTitle>
                            <strong>your Review success</strong>
                        </Alert>
                    }

                </Grid>
                <Grid className="col-lg-6">
                    <img src="https://i.ibb.co/vcgtgKr/2560px-Intro-img-svg.png" alt="" />
                </Grid>
            </Box>
        </div>
    );
};

export default Review;