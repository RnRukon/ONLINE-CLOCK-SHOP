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
        fetch('https://evening-woodland-47343.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [setProducts])
    return (
        <Box className='product-container '>
            <Navigation />

            <Container className='py-11'>

                <Typography color="secondary" className=' fw-bold underline text-center my-5' variant='h4'>Products  {products?.length}</Typography>
                <Typography className=' text-red-600 uppercase underline fw-bold pb-10' variant='h5'>
                    Unique Clock Collection
                </Typography>
                <Box className="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">
                    {
                        products?.map(product =>
                            <Box
                                key={product?._id} className="col ">
                                <Box className="card h-100 ">
                                    <Box sx={{ overflow: 'hidden' }}>
                                        <img className='img-fluid' src={product?.img} alt="..." />
                                    </Box>
                                    <Box className="card-body">
                                        <Typography
                                            variant="h5"
                                            className="card-title fw-bold">{product?.title}
                                        </Typography>
                                        <Typography variant='body2' className="card-text">{product?.description}</Typography>
                                    </Box>
                                    <Box className="card-footer d-flex justify-content-between">
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