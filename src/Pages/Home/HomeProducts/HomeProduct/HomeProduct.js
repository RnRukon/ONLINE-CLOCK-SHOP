import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const HomeProduct = ({ product }) => {
    const { title, description, img, _id, price } = product

    return (
        <Box className="col ">
            <Box className="card h-100 ">
                <Box sx={{ height: 365, overflow: 'hidden' }}>
                    <img className='img-fluid' src={img} alt="..." />
                </Box>
                <Box className="card-body">
                    <Typography variant="h5" className="card-title">{title}</Typography>
                    <Typography variant="body2" className="card-text">{description}</Typography>
                </Box>
                <Box className="card-footer d-flex justify-content-between">
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