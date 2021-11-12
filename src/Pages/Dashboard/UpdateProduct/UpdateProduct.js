import React, { useEffect, useState } from 'react';
import { Button, Box, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
const UpdateProduct = () => {


    const [updateData, setUpdateData] = useState([])


    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setUpdateData(data) || '')
    }, [])

    // console.log(updateData)

    const handleProductDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://evening-woodland-47343.herokuapp.com/productDelete/${id}`)
                .then(res => res.data.deletedCount &&
                    fetch('https://evening-woodland-47343.herokuapp.com/products')
                        .then(res => res.json())
                        .then(data => setUpdateData(data) || '')
                )

    }

    return (
        <div>
            <h1>Update Product</h1>
            <div className="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">
                {
                    updateData.map(product =>
                        <div className="col ">
                            <Box className="card h-100">
                                <Box sx={{ height: 290, overflow: 'hidden' }}>
                                    <img className='img-fluid' src={product?.img} alt="..." />
                                </Box>
                                <div className="card-body">
                                    <h5 className="card-title">{product?.title}</h5>
                                    <p className="card-text">{product?.description}</p>
                                    <typography>
                                        ${product?.price}
                                    </typography>
                                </div>

                                <CardActions className="card-footer d-flex justify-content-between">
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