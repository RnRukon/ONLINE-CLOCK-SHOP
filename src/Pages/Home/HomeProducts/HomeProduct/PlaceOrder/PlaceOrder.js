import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { Button, Box, Container, Grid, Typography, Divider } from '@mui/material';
import './PlaceOrder.css'



const PlaceOrder = () => {
    const [product, setProduct] = useState({}) || '';
    const { id } = useParams();
    const { user } = useAuth();


    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/placeProducts/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct])



    // const { title, description, img, price } = product;
    const title = product?.title;
    const description = product?.description;
    const img = product?.img;
    const price = product?.price;
    const email = user?.email;
    const name = user?.displayName;
    const date = new Date().toDateString();
    const status = 'Pending';
    const color = 'rgb(255, 234, 115)';



    // post order to database-----------------------------------------------

    const handleAddToCartProduct = () => {

        const addToCartProduct = { title, description, img, price, email, name, date, status, color };

        fetch('https://evening-woodland-47343.herokuapp.com/addToCartProduct', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(addToCartProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Your add to cart success')

                }

            })

    }




    return (
        <Box className='placeOrder-container'>
            <Navigation />
            <Container className='py-36'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="row ">

                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <img className='img-fluid' src={img} alt="" />
                        </Grid>
                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <Typography variant='h3' color='secondary'>{title}</Typography>
                            <p>{description}</p>
                            <h4>{price}</h4>
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
                </Box>
            </Container>
        </Box>
    );
};

export default PlaceOrder;