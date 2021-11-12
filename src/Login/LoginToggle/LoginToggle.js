import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Navigation from '../../Pages/Sheard/Navigation/Navigation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useHistory, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import { Grid, Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from 'react-bootstrap';
import GoogleIcon from '@mui/icons-material/Google';

const LoginToggle = () => {
    const { signInWithGoogle } = useAuth()
    const location = useLocation();
    const history = useHistory()
    const [toggle, setToggle] = useState(false);



    const handleToggle = () => setToggle(value => !value);

    return (

        <Box>
            <Navigation />
            <Container>

                <Grid sx={{ mt: 10 }} className="row">

                    <Box item className='col-lg-6'>
                        {toggle ? <Register /> : <Login />}

                        <Box >
                            <Typography defaultChecked sx={{ textAlign: 'center', my: 2, color: 'darkorange' }}>
                                -----------------or------------------
                            </Typography>
                            <Button sx={{ width: 1 }} onClick={() => signInWithGoogle(location, history)} variant="contained"><GoogleIcon />Google Sing In</Button>

                            <Box sx={{ mt: 5 }}>
                                {

                                    toggle ?
                                        <Typography sx={{ display: 'inline' }}>

                                            If you already have an account, please login
                                        </Typography> :
                                        <Typography sx={{ display: 'inline' }}>
                                            If you  not already have an account, please register
                                        </Typography>
                                }
                                <Switch defaultChecked variant="contained" color="secondary" checked={toggle} onClick={handleToggle}></Switch>
                            </Box>
                        </Box>
                    </Box>


                    <Grid item className='col-lg-6'>
                        <img className='img-fluid' src={toggle ? `https://alphalearning.in/assets/images/student-login-2.svg` : `https://i.ibb.co/rpBGTjq/isometric-data-protection-concept-with-parent-child-login-window-lock-3d-1284-63713.jpg`} alt="" />
                    </Grid>
                </Grid>



            </Container>


        </Box>

    );
};

export default LoginToggle;