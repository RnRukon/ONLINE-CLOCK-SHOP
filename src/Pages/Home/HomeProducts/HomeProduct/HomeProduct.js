import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const HomeProduct = ({ product }) => {
    const { title, description, img, _id, price } = product

    return (
        <Box class="col ">
            <Box class="card h-100 ">
                <Box sx={{ height: 365, overflow: 'hidden' }}>
                    <img className='img-fluid' src={img} class="card-img-top" alt="..." />
                </Box>
                <Box class="card-body">
                    <Typography variant="h5" class="card-title">{title}</Typography>
                    <Typography variant="body2" class="card-text">{description}</Typography>
                </Box>
                <Box class="card-footer d-flex justify-content-between">
                    <Link to={`placeOrder/${_id}`}>
                        <Button color="secondary" variant="contained">Order now</Button>
                    </Link>
                    <Typography variant='h5'>
                        ${price}
                    </Typography>
                </Box>
            </Box>
        </Box>)

};

export default HomeProduct;