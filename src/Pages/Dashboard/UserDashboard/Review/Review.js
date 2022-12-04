import React, { useState } from 'react';
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import useAuth from '../../../../Hooks/useAuth';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Review = () => {
    const [reviewData, setReviewData] = useState({});
    const [open, setOpen] = React.useState(false);
    const [ratingValue, setRatingValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
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
        reviewData.rating = ratingValue;

        fetch('https://online-clock-shop-server.onrender.com/api/v1/review', {
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

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={4} md={4}>
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
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={ratingValue}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setRatingValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {ratingValue !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
                                    )}
                                </Box> <br />

                                <Button color="warning" sx={{ width: 1, mt: 5 }} type="submit" variant="contained">Review</Button>
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
                <Grid item xs={4} sm={4} md={6}>
                    <img src="https://i.ibb.co/vcgtgKr/2560px-Intro-img-svg.png" alt="" />
                </Grid>
            </Grid>
        </div>
    );
};

export default Review;