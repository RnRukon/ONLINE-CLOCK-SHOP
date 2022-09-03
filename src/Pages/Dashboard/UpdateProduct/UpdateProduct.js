import React, { useEffect, useState } from 'react';
import { Button, Box, CardActions, Grid, CardMedia, Typography, Badge, Divider, Toolbar, Fab, Paper } from '@mui/material';
import axios from 'axios';

import UpdateProductFrom from './UpdateProductFrom/UpdateProductFrom';
import Swal from 'sweetalert2';


const UpdateProduct = () => {

    const [updateData, setUpdateData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState();
    const [id, setId] = useState("");


    const fetchData = () => {
        fetch('https://evening-woodland-47343.herokuapp.com/api/v1/products')
            .then(res => res.json())
            .then(data => setUpdateData(data) || '')
    }
    useEffect(() => {
        fetchData()
    }, [])



    const handleProductDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://evening-woodland-47343.herokuapp.com/api/v1/products/${id}`)

                    .then(res => {
                        if (res.status === 200) {
                            const deleted = updateData.filter((d) => d._id !== id);
                            setUpdateData(deleted);
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                    })
            }
        })
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
                            <Paper sx={{ boxShadow: '1px 2px 10px #cee3ff', padding: 2, borderRadius: 2, height: 1 }}>
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

                            </Paper>
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

