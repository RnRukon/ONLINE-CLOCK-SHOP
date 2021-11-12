import { Container, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import './HomeProduct.css'
import HomeProduct from './HomeProduct/HomeProduct';


const HomeProducts = () => {
    const [products, setProduces] = useState([]);

    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduces(data))
    }, [])
    return (
        <Box className="home-product-container pb-20">
            {products?.length === 0 && <LinearProgress color="secondary" />}
            <Container>

                <Typography className=' underline uppercase shadow-inner text-yellow-300' variant='h4' sx={{ py: 5, textAlign: 'center', fontWeight: 'bold' }}>
                    Unique Clock Collection
                </Typography>
                <Box class="row row-cols-1 row-cols-sm-12  row-cols-md-3 row-cols-lg-3 g-4">
                    {
                        products?.slice(0, 6)?.map(product => <HomeProduct key={product?._id} product={product}></HomeProduct>)
                    }

                </Box>
            </Container>
        </Box>
    );
};

export default HomeProducts;