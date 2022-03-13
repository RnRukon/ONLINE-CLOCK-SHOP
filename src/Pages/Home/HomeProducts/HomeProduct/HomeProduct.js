import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardActions, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';

const HomeProduct = ({ product }) => {
    const { title, description, img, _id, price } = product

    return (
        <Box  sx={{boxShadow:'1px 2px 10px #cee3ff',padding:2,borderRadius:2,height:1}}>
            <Box>
                <CardMedia 
              sx={{width:{ xs: '100%',sm:'100%', md: '100%' }}}
                component="img"
                src={img} alt={title} />
            </Box>
            <Box>
                <Typography variant="body" sx={{fontWeight:'bold'}}>{title.slice(0,20)}</Typography>
                <Typography variant="body2" sx={{textAlign:'justify'}}>{description.slice(0,50)} ...</Typography>
            </Box>
            <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
                <Link to={`placeOrder/${_id}`}>
                    <Button color="secondary" size='small' variant="contained">Order now</Button>
                </Link>
                <Typography variant='h5'>
                    ${price}
                </Typography>
            </CardActions>
        </Box>)

};

export default HomeProduct;