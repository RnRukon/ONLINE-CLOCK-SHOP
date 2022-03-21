import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { Button, Box, CardActions, Grid, Badge, CardMedia, Typography } from '@mui/material';
import './MyOrder.css'
import Swal from 'sweetalert2'


const MyOrder = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/myOrder/${user?.email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [user?.email])




    const handleMyOrderDelete = (id) => {
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

                axios.delete(`https://evening-woodland-47343.herokuapp.com/myOrderDelete/${id}`)
                    .then(res => {

                        if (res.data.deletedCount === 1) {
                            const deleted = products.filter((d) => d._id !== id);
                            setProducts(deleted)
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



    return (
        <div >

            {products?.length === 0 ?
                <Typography variant='h5'
                    sx={{ textAlign: 'center', color: 'red', py: 5 }}
                >No order was found for you, please order first</Typography>
                :
                <Typography variant='h5' sx={{ textAlign: 'center', color: 'crimson', py: 5 }}>My Order {products?.length} </Typography>
            }

            {
                products?.length === 0 && <img src="https://i.ibb.co/tq9K32W/Helium-10-xray.jpg" alt="" />
            }
            <Grid container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }} >

                {products?.map(product =>

                    <Grid item xs={4} sm={4} md={3} key={product?._id}>
                        <Box sx={{ boxShadow: '1px 2px 10px #cee3ff', padding: 2, borderRadius: 2, height: 1 }}>
                            <Badge badgeContent={` $${product?.total_amount}`} color="secondary">
                                <CardMedia
                                    sx={{ width: { xs: '100%', sm: '100%', md: '100%' } }}
                                    component="img"
                                    src={product?.product_image} alt={product?.product_name} />
                            </Badge>
                            <Box>
                                <Typography variant="body"
                                    sx={{ fontWeight: 'bold' }}>
                                    {product?.product_name.slice(0, 20)}</Typography>

                                <Typography variant="body2" sx={{ textAlign: 'justify' }}>{product?.product_profile.slice(0, 50)} ...</Typography>
                            </Box>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                <Button
                                    onClick={() => handleMyOrderDelete(product._id)}
                                    color="error" size='small' variant="contained">Delete</Button>

                                <Button size='small'
                                    color={
                                        (product?.status === 'Delivered' && 'success')
                                        || (product?.status === 'Approved' && 'info')
                                        || 'warning'
                                    }
                                    variant="contained"
                                >{product?.status}
                                </Button>
                            </CardActions>
                        </Box>
                    </Grid>)}
            </Grid>
        </div>
    );
};

export default MyOrder;