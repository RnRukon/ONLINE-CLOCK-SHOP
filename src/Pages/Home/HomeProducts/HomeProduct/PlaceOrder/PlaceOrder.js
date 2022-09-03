import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { Button, Box, Container, Grid, Typography, Divider, Toolbar } from '@mui/material';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Footer from '../../../../Sheard/Footer/Footer';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PlaceOrder = () => {
    const [product, setProduct] = useState({}) || '';
    const { id } = useParams();
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/api/v1/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct])


    const product_name = product?.title;
    const product_profile = product?.description;
    const product_image = product?.img;
    const total_amount = product?.price;
    const cus_email = user?.email;
    const cus_name = user?.displayName;
    const date = new Date().toDateString();
    const status = 'Pending';
    const color = 'rgb(255, 234, 115)';



    // post order to database-----------------------------------------------

    const handleAddToCartProduct = () => {

        const addToCartProduct = { product_name, product_profile, product_image, total_amount, cus_email, cus_name, date, status, color };

        fetch('https://evening-woodland-47343.herokuapp.com/api/v1/payment/init', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(addToCartProduct)
        })
            .then(res => res.json())
            .then(data => {

                window.location.replace(data)

            })

    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const back = () => window.history.back();
    return (
        <Box >
            <Navigation />
            <Toolbar />
            <Container sx={{ py: 10 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid item xs={4} sm={4} md={6}>
                            <img style={{ width: '100%' }} src={product_image} alt="" />
                        </Grid>

                        <Grid item xs={4} sm={4} md={6}>
                            <Typography variant='h5' color='secondary'>{product_name}</Typography>
                            <Typography>{product_profile}</Typography>

                            <Typography variant='h5'
                                sx={{ fontWeight: 'bold', color: 'red' }}
                            >${total_amount}
                            </Typography>
                            <Divider />
                            <Box >

                                <Typography variant='h5'>
                                    Name:  {user.displayName}
                                </Typography>
                                <Typography variant="body">
                                    Email:  {user.email}
                                </Typography>
                            </Box>
                            <Toolbar />
                            <Button sx={{ mr: 1 }} color='secondary' onClick={handleAddToCartProduct} variant="contained" >Purchase</Button>

                            <Link to='/products' style={{ textDecoration: "none" }}>
                                <Button sx={{ mr: 1 }} color='primary' variant="contained"> Explore</Button>
                            </Link>

                            <Button
                                onClick={back}
                                color='warning'
                                variant="contained">
                                Go Back
                            </Button>



                            <Box sx={{ mt: 2 }}>
                                <Typography variant='h5' color='secondary'>Contact informations</Typography>
                                <Typography>A: Kichijoji Sun Road 21/1, Tokyo.</Typography>
                                <Typography>T: + 123 456 789: + 123 456 8788</Typography>
                                <small>E: etruscan@qodeinteractive.com</small>
                                <Typography>W: Thursday to Sunday – 12.00 – 20.00h.</Typography>
                            </Box>
                        </Grid>


                    </Grid>

                    <Stack spacing={2} sx={{ width: "100%" }}>

                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                Your add to cart success!
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default PlaceOrder;