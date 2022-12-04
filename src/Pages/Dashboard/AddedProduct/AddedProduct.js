import React, { useState } from 'react';
import { Button, Grid, IconButton, LinearProgress, Rating, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from '../../../Hooks/useAuth';
import { Box } from '@mui/system';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import StarIcon from '@mui/icons-material/Star';
import uploadImage from '../../../Hooks/useImgUpload';

const Input = styled('input')({
    display: 'none',
});

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};





const AddedProduct = () => {
    const [productData, setProductData] = useState({});
    const [img, setImg] = useState('')
    const { isLoading } = useAuth();
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...productData }
        newProductData[field] = value;
        setProductData(newProductData)

    }

    const handleAddAProduct = (e) => {
        e.preventDefault();
        const newData = { ...productData, img, rating: value }
        fetch('https://online-clock-shop-server.onrender.com/api/v1/products', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    alert('Added Product success')
                }
            })

        e.target.reset();

    }
    const handleImgUpload = img => {
        uploadImage(img)
            .then(res => {
                setImg(res.data.data.url);
            })
    }
    return (
        <Box style={{ height: '100vh' }}>
            <Toolbar />
            <Typography variant='h5' >
                ADD A PRODUCT
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={4} md={6}>
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
                                />

                                <br />
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

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Stack direction="row" alignItems="center" spacing={2}>

                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/png, image/jpg, image/jpeg" id="icon-button-file" type="file"
                                                onChange={e => handleImgUpload(e.target.files[0])}
                                            />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                            Image
                                        </label>
                                    </Stack>


                                    <Box
                                        sx={{
                                            width: 200,
                                            display: 'flex',
                                            alignItems: 'center',

                                        }}
                                    >
                                        <Rating
                                            name="hover-feedback"
                                            value={value}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                    </Box>
                                </Box>
                                <Button sx={{ width: 1, mt: 5 }} color='error' type="submit" variant="contained">Add a Product</Button>
                            </form>
                    }


                </Grid>
                <Grid item xs={2} sm={4} md={6}>
                    <img src="https://i2.wp.com/files.123freevectors.com/wp-content/uploads/new/objects/407-free-clock-vector-illustrator.png" alt="" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddedProduct;