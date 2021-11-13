import React, { useEffect, useState } from 'react';
import { Button, Box, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UpdateProduct = () => {


    const [updateData, setUpdateData] = useState([])
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setUpdateData(data) || '')
    }, [])



    const handleProductDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://evening-woodland-47343.herokuapp.com/productDelete/${id}`)
                .then(res => res.data.deletedCount &&
                    fetch('https://evening-woodland-47343.herokuapp.com/products')
                        .then(res => res.json())
                        .then(data => setUpdateData(data) || '')
                        .finally(() => {
                            setOpen(true);
                        })
                )


    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    return (
        <div>
            <h1 className='text-pink-700 underline uppercase py-4'>Update Product</h1>
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
            <Stack spacing={2} sx={{ width: '100%' }}>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Delete success!
                    </Alert>
                </Snackbar>

            </Stack>

        </div >
    );
};

export default UpdateProduct;