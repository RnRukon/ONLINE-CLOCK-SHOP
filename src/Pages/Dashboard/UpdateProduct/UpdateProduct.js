import React, { useEffect, useState } from 'react';
import { Button, Box, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
const UpdateProduct = () => {


    const [updateData, setUpdateData] = useState([])


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setUpdateData(data) || '')
    }, [])

    // console.log(updateData)

    const handleProductDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:5000/productDelete/${id}`)
                .then(res => res.data.deletedCount &&
                    fetch('http://localhost:5000/products')
                        .then(res => res.json())
                        .then(data => setUpdateData(data) || '')
                )

    }

    return (
        <div>
            <h1>Update Product</h1>
            <div class="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">
                {
                    updateData.map(product =>
                        <div class="col ">
                            <Box class="card h-100">
                                <Box sx={{ height: 290, overflow: 'hidden' }}>
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
                                    <Link to={`updateProductFrom/${product._id}`}>
                                        <Button sx={{ width: 100, p: 0 }} >Update</Button>
                                    </Link>
                                    <Button onClick={() => handleProductDelete(product?._id)} sx={{ width: 100, p: 0 }} >Delete</Button>
                                </CardActions>
                            </Box>
                        </div>)
                }
            </div>

        </div >
    );
};

export default UpdateProduct;