import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { Button, Box, Container, Grid, Typography, Divider } from '@mui/material';
import './PlaceOrder.css'

import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PlaceOrder = () => {
    const [product, setProduct] = useState({}) || '';
    const { id } = useParams();
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/placeProducts/${id}`)
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

        fetch('https://evening-woodland-47343.herokuapp.com/init', {
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

    return (
        <Box className='placeOrder-container'>
            <Navigation />
            <Container className='py-36'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="row ">

                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <img className='img-fluid' src={product_image} alt="" />
                        </Grid>
                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <Typography variant='h3' color='secondary'>{product_name}</Typography>
                            <p>{product_profile}</p>
                            <h4>{total_amount}</h4>
                            <Divider />
                            <Box className="py-4">

                                <Typography variant='h4'>
                                    Name:  {user.displayName}
                                </Typography>
                                <Typography variant="h6">
                                    Email:  {user.email}
                                </Typography>
                            </Box>

                            <Button sx={{ mr: 3 }} className='mt-2' color='secondary' onClick={handleAddToCartProduct} variant="contained" >Add to Cart</Button>
                            <Link className='mr-5 ' to='/products'><Button className='mt-2' color='primary' variant="contained"> Explore</Button></Link>
                            <Link to='/' ><Button color='warning' className='mt-2' variant="contained"> Go to home</Button></Link>


                            <Box className='mt-5'>
                                <Typography variant='h4' color='secondary'>Contact informations</Typography>
                                <p className='text-yellow-500'>A: Kichijoji Sun Road 21/1, Tokyo.</p>
                                <p>T: + 123 456 789: + 123 456 8788</p>
                                <small>E: etruscan@qodeinteractive.com</small>
                                <p>W: Thursday to Sunday – 12.00 – 20.00h.</p>
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
        </Box>
    );
};

export default PlaceOrder;