import { Box, Button, IconButton,LinearProgress, Stack, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import uploadImage from '../../Hooks/useImgUpload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



const Register = () => {
    const [loginData, setLoginData] = useState({});
    const { registerUser, isLoading, authError } = useAuth();
    const location = useLocation()
    const history = useHistory();
    const [photo, setPhoto] = useState('');

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData)

    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.password !== loginData.rePassword) {

            return Swal.fire({
                icon: 'warning',
                title: 'Warning!!!',
                text: 'Password not Match🥵',

            })
        }

        registerUser(loginData.email, loginData.password, loginData.name, photo, location, history)
        e.target.reset();
    }
    const handleImgUpload = img => {
        uploadImage(img)
            .then(res => {
                setPhoto(res.data.data.url);
            })
    }

    const Input = styled('input')({
        display: 'none',
    });
    
authError&&Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: authError,
   
  })


    return (

        <Box >
            {
                isLoading ? <LinearProgress /> :
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: 1 }}
                            required
                            id="standard-name-input"
                            label="You Full Name"
                            type="text"
                            name="name"
                            autoComplete="current-name"
                            variant="standard"
                            onBlur={handleOnBlur}
                            color="secondary"
                        /> <br />
                        <TextField
                            sx={{ width: 1 }}
                            required
                            id="standard-email-input"
                            label="You Email"
                            type="email"
                            name="email"
                            autoComplete="current-email"
                            variant="standard"
                            onBlur={handleOnBlur}
                            color="secondary"
                        /> <br />
                        <TextField
                            sx={{ width: 1 }}
                            required
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            variant="standard"
                            onBlur={handleOnBlur}
                            color="secondary"
                        />
                        <TextField
                            sx={{ width: 1 }}
                            required
                            id="standard-password-input"
                            label="Re-type Password"
                            type="password"
                            name="rePassword"
                            autoComplete="current-password"
                            variant="standard"
                            onBlur={handleOnBlur}
                            color="secondary"
                        />
                        <Stack direction="row" alignItems="center" spacing={2}>

                            <label htmlFor="icon-button-file">
                                <Input 
                                sx={{width:1}}
                                accept="image/png, image/jpg, image/jpeg" id="icon-button-file" type="file"
                                    onChange={e => handleImgUpload(e.target.files[0])}
                                />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                                Profile Photo
                            </label>
                        </Stack>
                        <Button color="secondary" sx={{ width: 1, mt: 5 }} type="submit" variant="contained">Register</Button>
                    </form>
            }
        </Box>

    );
};

export default Register;