import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Rating, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import StarIcon from '@mui/icons-material/Star';
import uploadImage from '../../../../Hooks/useImgUpload';

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

const UpdateProductFrom = ({ id, handleClose, open, scroll, fetchData }) => {

    const [product, setProduct] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const [img, setImg] = useState('');
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    useEffect(() => {
        fetch(`https://online-clock-shop-server.onrender.com/api/v1/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setValue(data?.rating)
                setImg(data?.img)
                reset(data)
            })
    }, [id, setProduct, reset])


    const update = (data) => {
        const newUpdateData = { ...data, img, rating: value }
        axios.put(`https://online-clock-shop-server.onrender.com/api/v1/products/${id}`, newUpdateData)
            .then(res => {


                if (res?.status === 200) {
                    alert('Update SuccessFully')
                    handleClose()
                    fetchData()
                }
            })

        reset();
    }


    const handleImgUpload = img => {
        uploadImage(img)
            .then(res => {
                const imgUrl = res.data.data.url;
                setImg(imgUrl);
            })
    }
    return (
        <Dialog
            open={open}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">
                Edit Books {product?.title}
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
                <Box>
                    {
                        product?._id &&
                        <form onSubmit={handleSubmit(update)}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={4} sm={4} md={12} >
                                    <TextField
                                        id="filled-basic"
                                        label="Title"
                                        variant="filled"
                                        color='secondary'
                                        fullWidth
                                        focused
                                        {...register('title', { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={8} md={12} >
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="Description"
                                        multiline
                                        maxRows={4}
                                        variant="filled"
                                        color='secondary'
                                        fullWidth
                                        focused
                                        {...register('description', { required: true })} />
                                </Grid>
                                <Grid item xs={4} sm={8} md={12} >
                                    <TextField
                                        id="filled-basic"
                                        label="Price"
                                        variant="filled"
                                        color='secondary'
                                        fullWidth
                                        focused
                                        {...register('price',
                                            { required: true })} />
                                </Grid>
                                <Grid item xs={4} sm={8} md={12} >
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
                                        <img style={{ width: 50 }} src={img} alt="" />
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
                                </Grid>
                                <Grid item xs={4} sm={8} md={12} >
                                    <Button
                                        type="submit"
                                        size='small'
                                        color='secondary'
                                        fullWidth
                                        variant='contained'>Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>



    );
};

export default UpdateProductFrom;