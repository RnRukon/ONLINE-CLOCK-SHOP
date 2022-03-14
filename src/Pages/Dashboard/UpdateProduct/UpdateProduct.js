import React, { useEffect, useState } from 'react';
import { Button, Box, CardActions, Grid, CardMedia, Typography, Badge, Divider, Toolbar, Fab } from '@mui/material';
import axios from 'axios';

import UpdateProductFrom from './UpdateProductFrom/UpdateProductFrom';


const UpdateProduct = () => {

    const [updateData, setUpdateData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState();
    const [id, setId] = useState("");


    const fetchData = () => {
        fetch('https://evening-woodland-47343.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setUpdateData(data) || '')
    }
    useEffect(() => {
        fetchData()
    }, [])



    const handleProductDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://evening-woodland-47343.herokuapp.com/productDelete/${id}`)
                .then(res => res.data.deletedCount &&
                    fetch('https://evening-woodland-47343.herokuapp.com/products')
                        .then(res => res.json())
                        .then(data => setUpdateData(data) || '')
                        .finally(() => {

                        })
                )


    }



    const handleClose = () => {
        setOpen(false);
    };
    const handleSetScroll = (id) => {
        setId(id);
        setScroll();
        setOpen(true);
    };

    return (
        <Box>
            <Toolbar />
            <Divider>
                <Fab
                    variant="extended"
                    size="small"
                    color="secondary"
                    aria-label="add">

                    <Typography
                        variant='body1'

                        sx={{ fontWeight: '900', fontSize: 20 }}
                    >Update Product</Typography>
                </Fab>

            </Divider>
            <Toolbar />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {
                    updateData.map(product =>
                        <Grid item xs={4} sm={4} md={3} key={product?._id}>
                            <Box sx={{ boxShadow: '1px 2px 10px #cee3ff', padding: 2, borderRadius: 2, height: 1 }}>
                                <Badge color="secondary" badgeContent={`$${product?.price}`}>
                                    <CardMedia
                                        sx={{ width: { xs: '100%', sm: '100%', md: '100%' } }}
                                        component="img"
                                        src={product?.img} alt={product?.title} />
                                </Badge >
                                <Box>
                                    <Typography variant="body"
                                        sx={{ fontWeight: 'bold' }}>
                                        {product?.title.slice(0, 20)}</Typography>

                                    <Typography variant="body2" sx={{ textAlign: 'justify' }}>{product?.description.slice(0, 50)} ...</Typography>
                                </Box>
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button
                                        onClick={() => handleProductDelete(product?._id)}
                                        color="secondary" size='small' variant="contained">Delete</Button>



                                    <Button

                                        color="secondary" size='small' variant="contained"
                                        onClick={() => handleSetScroll(product?._id)}
                                    >Update</Button>


                                </CardActions>

                            </Box>
                        </Grid>
                    )
                }
            </Grid>

            <UpdateProductFrom
                id={id}
                handleClose={handleClose}
                open={open}
                scroll={scroll}
                fetchData={fetchData}
            />
        </Box>
    );
};

export default UpdateProduct;

