import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { Button, Box, CardActions } from '@mui/material';
import './MyOrder.css'

import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MyOrder = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([])
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        fetch(`https://evening-woodland-47343.herokuapp.com/myOrder/${user?.email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [user?.email])


    const handleMyOrderDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://evening-woodland-47343.herokuapp.com/myOrderDelete/${id}`)
                .then(res => {

                    res.data.deletedCount &&
                        fetch(`https://evening-woodland-47343.herokuapp.com/myOrder/${user?.email}`)
                            .then(res => res.json())
                            .then(data => setProducts(data))
                }

                )
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div >

            <h1 className=' text-pink-600 text-center'>My Order {products?.length} </h1>
            <h4 className=' text-pink-800 text-center'>Please come and order</h4>

            {
                products?.length === 0 && <img src="https://i.ibb.co/tq9K32W/Helium-10-xray.jpg" alt="" />
            }
            <div className="row row-cols-1 row-cols-sm-4  row-cols-md-2 row-cols-lg-4 g-4">


                {
                    products?.map(product => <div key={product?._id} className="col ">



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
                                <Button sx={{ width: 100, p: 0 }} onClick={() => handleMyOrderDelete(product._id)}>Delete</Button>
                                <Button sx={{ width: 100, p: 0 }} style={{ backgroundColor: `${product?.color}` }}>{product.status}</Button>
                            </CardActions>


                        </Box>
                        <Stack spacing={2} sx={{ width: "100%" }}>

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                    Delete success!
                                </Alert>
                            </Snackbar>
                        </Stack>

                    </div>)
                }
            </div>


        </div>
    );
};

export default MyOrder;