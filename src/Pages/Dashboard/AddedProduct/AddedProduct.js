import React, { useState } from 'react';
import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';


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

        fetch('http://localhost:5000/addedProduct', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Added product success')
                if (data.modifiedCount) {
                    alert('Added Product success')
                }
            })

        e.preventDefault();
        e.target.reset();
    }
    return (
        <div style={{ height: '100vh' }}>
            <Typography variant='h4'>
                ADD A PRODUCT
            </Typography>

            <Grid >
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

                            <Button color="warning" sx={{ width: 1, mt: 5 }} type="submit" className="feature-button" variant="contained">Add a Product</Button>
                        </form>
                }


            </Grid>
        </div>
    );
};

export default AddedProduct;