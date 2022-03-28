import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Navigation from '../../Pages/Sheard/Navigation/Navigation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useHistory, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import { Chip, Container, Divider, Grid, Switch, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import Footer from '../../Pages/Sheard/Footer/Footer';

const LoginToggle = () => {
    const { signInWithGoogle } = useAuth()
    const location = useLocation();
    const history = useHistory()
    const [toggle, setToggle] = useState(false);



    const handleToggle = () => setToggle(value => !value);

    return (

        <Box>
            <Navigation />
            <Toolbar />
            <Toolbar />

            <Container>

                <Grid sx={{ mt: 10 }}
                    container spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={4} sm={4} md={6}>
                        {toggle ? <Register /> : <Login />}

                        <Box >
                            <Typography defaultChecked sx={{ textAlign: 'center', my: 2, color: 'darkorange' }}>
                                <Divider>
                                    <Chip label="Or">
                                    </Chip>
                                </Divider>
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
                    </Grid>


                    <Grid item xs={4} sm={4} md={6}>
                        <img  src={toggle ? `https://alphalearning.in/assets/images/student-login-2.svg` : `https://alphalearning.in/assets/images/student-login-2.svg`} alt="" />
                    </Grid>
                </Grid>



            </Container>

            <Footer />
        </Box>

    );
};

export default LoginToggle;