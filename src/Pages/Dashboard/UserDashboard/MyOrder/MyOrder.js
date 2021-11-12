import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { Button, Box, Container, Typography, CardActionArea, CardActions } from '@mui/material';
import { typography } from '@mui/system';
import './MyOrder.css'
// import axios from 'axios';
const MyOrder = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/myOrder/${user?.email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [user?.email])

    console.log(products)
    const handleMyOrderDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:5000/myOrderDelete/${id}`)
                .then(res => res.data.deletedCount &&
                    fetch(`http://localhost:5000/myOrder/${user?.email}`)
                        .then(res => res.json())
                        .then(data => setProducts(data))
                )

    }
    console.log(products)
    return (
        <div className='myOrder-Container'>
            <h1 className='text-yellow-300  text-center'>My Order {products?.length} </h1>
            <h4 className='text-green-50 text-center'>Please come and order</h4>
            <div class="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">
                {
                    products?.map(product => <div key={product?._id} class="col ">



                        <Box class="card h-100">


                            <Box sx={{ height: 150, overflow: 'hidden' }}>
                                <img className='img-fluid' src={product?.img} class="card-img-top" alt="..." />
                            </Box>
                            <div class="card-body">
                                <h5 class="card-title">{product?.title}</h5>
                                <p class="card-text">{product?.description}</p>
                                <typography>
                                    ${product?.price}
                                </typography>
                            </div>

                            <CardActions class="card-footer d-flex justify-content-between">
                                <Button sx={{ width: 100, p: 0 }} onClick={() => handleMyOrderDelete(product._id)}>Delete</Button>
                                <Button sx={{ width: 100, p: 0 }} style={{ backgroundColor: `${product?.color}` }}>{product.status}</Button>
                            </CardActions>


                        </Box>

                    </div>)
                }
            </div>


        </div>
    );
};

export default MyOrder;