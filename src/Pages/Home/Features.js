import { Box, Grid, Toolbar } from '@mui/material';
import React from 'react';

const Features = () => {

    const features = [
        {
            img: 'https://i.ibb.co/xmc22S1/worldclock-og.png'
        },
        
        {
            img: 'https://i.ibb.co/fpMbwX8/shutterstock-219283411-resize.jpg'
        },
        {
            img: 'https://i.ibb.co/x8gKkBC/e54-1.png'
        }
        ,
        {
            img: 'https://i.ibb.co/RzcGYjt/multiple-timezone-clocks.jpg'
        }
    ]
    return (
        <Box >
            <Toolbar />
            <Toolbar />
            <Toolbar />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} >
                {
                    features.map((feature, index) =>
                        <Grid item key={index} xs={12} sm={12} md={12}>
                            <img src={feature.img} alt="" />
                        </Grid>
                    )

                }
            </Grid>
        </Box>
    );
};

export default Features;