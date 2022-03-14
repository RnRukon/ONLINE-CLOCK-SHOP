import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navigation from '../../Sheard/Navigation/Navigation';
import { Link } from 'react-router-dom';
import { Badge, Button, CardActions, CardMedia, Container, Divider, Grid, LinearProgress, Pagination, Rating, Stack, Toolbar, Typography } from '@mui/material';

import Footer from '../../Sheard/Footer/Footer';
const Products = () => {
    const [products, setProducts] = useState([]) || '';
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/products?page=${page}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [setProducts, page])

    console.log(page)
    return (
        <Box className='product-container '>
            <Navigation />
            <Box sx={{
                backgroundImage: 'url(https://i.ibb.co/fpMbwX8/shutterstock-219283411-resize.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'


            }}>

                <Toolbar />
                <Toolbar />
                <Toolbar />
                <Toolbar />
                <Toolbar />
                <Toolbar />
            </Box>
            <Container className='py-11'>
                <Divider>
                    <Typography color="secondary" variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Unique Collection
                    </Typography>
                </Divider>
                <Toolbar />
                {
                    products.length < 1 && <LinearProgress color="secondary" />
                }
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {
                        products?.map(product =>
                            <Grid item xs={4} sm={4} md={3} key={product?._id}>
                                <Box sx={{ boxShadow: '1px 2px 10px #cee3ff', padding: 2, borderRadius: 2, height: 1 }}>
                                    <Badge badgeContent={` $${product?.price}`} color="secondary">
                                        <CardMedia
                                            sx={{ width: { xs: '100%', sm: '100%', md: '100%' } }}
                                            component="img"
                                            src={product?.img} alt={product?.title} />
                                    </Badge>
                                    <Box>
                                        <Typography variant="body"
                                            sx={{ fontWeight: 'bold' }}>
                                            {product?.title.slice(0, 20)}</Typography>

                                        <Typography variant="body2" sx={{ textAlign: 'justify' }}>{product?.description.slice(0, 50)} ...</Typography>
                                    </Box>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Link to={`placeOrder/${product?._id}`}>
                                            <Button color="secondary" size='small' variant="contained">Order now</Button>
                                        </Link>
                                        <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
                                    </CardActions>
                                </Box>
                            </Grid>)
                    }
                </Grid>
                <Stack spacing={2}>
                    <Pagination
                        sx={{ pt: 5, m: 'auto' }}
                        count={products.length}
                        color="secondary"
                        onChange={(e, value) => setPage(value)}
                    />
                </Stack>
            </Container>
            <Footer></Footer>
        </Box>
    );
};

export default Products;