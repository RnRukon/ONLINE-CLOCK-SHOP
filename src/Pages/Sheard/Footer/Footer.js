import { TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';

const Footer = () => {
    return (
        <div className=" text-white" style={{backgroundColor:'#011837'}}>
            <div className='container py-20'>
                <div className='row '>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <Typography variant='h4' color='secondary'>Contact informations</Typography>
                        <p className='text-yellow-500'>A: Kichijoji Sun Road 21/1, Tokyo.</p>
                        <p>T: + 123 456 789: + 123 456 8788</p>
                        <small>E: etruscan@qodeinteractive.com</small>
                        <p>W: Thursday to Sunday – 12.00 – 20.00h.</p>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <Typography variant='h4' color='secondary'>CLock Online Shop</Typography>
                        <h5 className='text-yellow-500'>Unique Clock Collection</h5>
                        <Toolbar sx={{ color: 'white' }} />
                        <TextField
                            // sx={{ my: 3, backgroundColor: 'white' }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                            color='secondary'
                            label="Email"
                            id="standard-size-small"
                            defaultValue="Retailer@gmail.com"
                            size="small"
                            variant="standard"

                        />
                        <Button color='secondary' variant='contained'>Send</Button>

                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <Typography variant='h4' color='secondary'>Latest updates</Typography>
                        <p className='text-yellow-500'>Against all odds see good results</p>
                        <p>Nov 22, 2021</p>
                        <small>First tried and true dish line</small>
                        <p>Nov 22, 2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;