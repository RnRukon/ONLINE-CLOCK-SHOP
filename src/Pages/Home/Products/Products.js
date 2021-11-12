import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navigation from '../../Sheard/Navigation/Navigation';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import './Product.css'
import Footer from '../../Sheard/Footer/Footer';
const Products = () => {
    const [products, setProducts] = useState([]) || '';

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [setProducts])
    return (
        <Box className='product-container '>
            <Navigation />
            <Container className='py-11'>
                <Typography color="secondary" className=' fw-bold underline text-center my-5' variant='h4'>Products  {products?.length}</Typography>
                <Typography className=' text-yellow-500 pb-10' variant='h5'>
                    Unique Porcelain Collection
                </Typography>
                <Box class="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">
                    {
                        products?.map(product =>
                            <Box
                                key={product?._id} class="col ">
                                <Box class="card h-100 ">
                                    <Box sx={{ height: 265, overflow: 'hidden' }}>
                                        <img className='img-fluid' src={product?.img} class="card-img-top" alt="..." />
                                    </Box>
                                    <Box class="card-body">
                                        <Typography
                                            variant="h5"
                                            class="card-title fw-bold">{product?.title}
                                        </Typography>
                                        <Typography variant='body2' class="card-text">{product?.description}</Typography>
                                    </Box>
                                    <Box class="card-footer d-flex justify-content-between">
                                        <Link to={`placeOrder/${product._id}`}>
                                            <Button color="secondary" variant="contained">Order now</Button>
                                        </Link>
                                        <Typography variant='h5'>
                                            ${product?.price}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>)
                    }
                </Box>
            </Container>
            <Footer></Footer>
        </Box>
    );
};

export default Products;