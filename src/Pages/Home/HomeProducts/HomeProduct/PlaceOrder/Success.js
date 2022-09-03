import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Grid, Typography, Divider, Toolbar } from '@mui/material';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { Link, useParams } from 'react-router-dom';


const Success = () => {
    const [product, setProduct] = useState({}) || '';
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/api/v1/payment/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct])

    const back = () => window.history.back();
    return (
        <Box>
            <Navigation />
            <Container sx={{ py: 10 }}>
                <Typography variant='h4'
                    sx={{ color: 'green', fontWeight: 'bold', textAlign: 'center', py: 10 }}
                >Permanent Successfully</Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid item xs={4} sm={4} md={6}>
                            <img style={{ width: '100%' }} src={product?.product_image} alt="" />
                        </Grid>

                        <Grid item xs={4} sm={4} md={6}>
                            <Typography variant='h5' color='secondary'>{product?.product_name}</Typography>
                            <Typography>{product?.product_profile}</Typography>

                            <Typography variant='h5'
                                sx={{ fontWeight: 'bold', color: 'red' }}
                            >${product?.total_amount}
                            </Typography>
                            <Divider />
                            <Box >

                                <Typography variant='h5'>
                                    Name:  {product?.cus_name}
                                </Typography>
                                <Typography variant="body">
                                    Email:  {product?.cus_email}
                                </Typography>
                            </Box>
                            <Toolbar />


                            <Link to='/products' style={{ textDecoration: "none" }}>
                                <Button sx={{ mr: 1 }}
                                    size='small'
                                    color='primary'
                                    variant="contained"> Explore
                                </Button>
                            </Link>

                            <Button
                                onClick={back}
                                sx={{ mr: 1 }}
                                size='small'
                                color='warning'
                                variant="contained">
                                Go Back
                            </Button>
                            <Link to='/dashboard' style={{ textDecoration: "none" }}>
                                <Button
                                    size='small'
                                    color='info'
                                    variant="contained">
                                    Dashboard
                                </Button>
                            </Link>



                            <Box sx={{ mt: 2 }}>
                                <Typography variant='h5' color='secondary'>Contact informations</Typography>
                                <Typography>A: Kichijoji Sun Road 21/1, Tokyo.</Typography>
                                <Typography>T: + 123 456 789: + 123 456 8788</Typography>
                                <small>E: etruscan@qodeinteractive.com</small>
                                <Typography>W: Thursday to Sunday – 12.00 – 20.00h.</Typography>
                            </Box>
                        </Grid>


                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Success;