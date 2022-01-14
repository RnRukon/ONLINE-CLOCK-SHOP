import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Grid, Typography, Divider } from '@mui/material';
import Navigation from '../../../../Sheard/Navigation/Navigation';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Success = () => {
    const [product, setProduct] = useState({}) || '';
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/orders/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct])

    console.log(product)
    return (
        <Box className='placeOrder-container'>
            <Navigation />
            <Container className='py-36'>
                <h1 className=' text-center text-green-400 border'>Permanent Successfully</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="row ">

                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <img className='img-fluid' src={product?.img} alt="" />
                        </Grid>
                        <Grid className='col-sm-12 col-md-6 col-lg-6'>
                            <Typography variant='h3' color='secondary'>{product?.product_name}</Typography>
                            <p>{product?.product_profile}</p>
                            <h4>$ {product?.total_amount}</h4>
                            <Divider />
                            <Box className="py-4">

                                <Typography variant='h4'>
                                    Name:  {product?.cus_name}
                                </Typography>
                                <Typography variant="h6">
                                    Email:  {product?.cus_email}
                                </Typography>
                            </Box>


                            <Link className='mr-5 ' to='/products'><Button className='mt-2' color='primary' variant="contained"> Explore</Button></Link>
                            <Link to='/' className=' mr-5'><Button color='warning' className='mt-2' variant="contained"> Go to home</Button></Link>

                            <Link to='/dashboard' ><Button color='secondary' className='mt-2' variant="contained">Dashboard</Button></Link>


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

export default Success;