import { Divider, Grid, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

import HomeProduct from './HomeProduct/HomeProduct';


const HomeProducts = () => {
    const [products, setProduces] = useState([]);

    useEffect(() => {
        fetch('https://online-clock-shop-server.onrender.com/api/v1/products')
            .then(res => res.json())
            .then(data => setProduces(data))
    }, [])
    return (
        <Box sx={{ pb: 20 }}>
            {products?.length === 0 && <LinearProgress color="secondary" />}
            <Box>
                <Toolbar />

                <Divider>
                    <Typography color="secondary" variant='h4' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Unique Collection
                    </Typography>
                </Divider>
                <Toolbar />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {
                        products?.slice(0, 6)?.map(product =>

                            <Grid item xs={4} sm={4} md={4} key={product?._id}>
                                <HomeProduct product={product}></HomeProduct>
                            </Grid>
                        )}

                </Grid>
            </Box>
        </Box>
    );
};

export default HomeProducts;