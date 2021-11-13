import React, { useState } from 'react';
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import useAuth from '../../../../Hooks/useAuth';
import { Box } from '@mui/system';

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Review = () => {
    const [reviewData, setReviewData] = useState({});
    const [open, setOpen] = React.useState(false);
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

                if (data.insertedId) {
                    setOpen(true);
                }
            })

        e.preventDefault();
        e.target.reset();
    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
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

                    <Stack spacing={2} sx={{ width: "100%" }}>

                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                Add a review success!
                            </Alert>
                        </Snackbar>
                    </Stack>

                </Grid>
                <Grid className="col-lg-6">
                    <img src="https://i.ibb.co/vcgtgKr/2560px-Intro-img-svg.png" alt="" />
                </Grid>
            </Box>
        </div>
    );
};

export default Review;