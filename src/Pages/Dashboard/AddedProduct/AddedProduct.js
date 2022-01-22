import React, { useState } from 'react';
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';
import { Box } from '@mui/system';


const AddedProduct = () => {
    const [productData, setProductData] = useState({});
    const { isLoading } = useAuth();


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...productData }
        newProductData[field] = value;
        setProductData(newProductData)

    }

    const handleAddAProduct = (e) => {
        e.preventDefault();

        fetch('https://evening-woodland-47343.herokuapp.com/addedProduct', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    alert('Added Product success')
                }
            })

        e.target.reset();
    }
    return (
        <div style={{ height: '100vh' }}>
            <Typography variant='h4' className='text-pink-600'>
                ADD A PRODUCT
            </Typography>

            <Box className='row'>
                <Grid className='col-lg-5 mt-lg-5'>
                    {
                        isLoading ? <LinearProgress /> :
                            <form onSubmit={handleAddAProduct}>
                                <TextField
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-name-input"
                                    label="Product Title"
                                    type="text"
                                    name="title"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                    color="warning"
                                /> <br />
                                <TextField
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-text-input"
                                    label="Description"
                                    type="text"
                                    name="description"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                    color="warning"
                                /> <br />
                                <TextField
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-text-input"
                                    label="IMG URL"
                                    type="text"
                                    name="img"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                    color="warning"
                                /> <br />
                                <TextField
                                    sx={{ width: 1 }}
                                    required
                                    id="standard-number-input"
                                    label="price"
                                    type="number"
                                    name="price"
                                    variant="standard"
                                    onBlur={handleOnBlur}
                                    color="warning"
                                />

                                <Button sx={{ width: 1, mt: 5 }} color='error' type="submit" className="feature-button" variant="contained">Add a Product</Button>
                            </form>
                    }


                </Grid>
                <Grid className="col-lg-7">
                    <img src="https://i2.wp.com/files.123freevectors.com/wp-content/uploads/new/objects/407-free-clock-vector-illustrator.png" alt="" />
                </Grid>
            </Box>
        </div>
    );
};

export default AddedProduct;