import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { Button, Box, Container, Grid, Typography } from '@mui/material';




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
        <Box>
            <Navigation />
            <Container className='pt-4'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="row ">

                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <img className='img-fluid' src={img} alt="" />
                        </Grid>
                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <Typography variant='h3' color='secondary'>{title}</Typography>
                            <p>{description}</p>
                            <h4>{price}</h4>


                            <Button sx={{ mr: 5 }} color='secondary' onClick={handleAddToCartProduct} variant="contained" >Add to Cart</Button>
                            <Link to='/'><Button color='warning' variant="contained"> Go to home</Button></Link>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default PlaceOrder;