import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { useHistory, useLocation } from 'react-router';
import Swal from 'sweetalert2';


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser, authError } = useAuth();
    const location = useLocation();
    const history = useHistory()
    const login = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        await loginUser(loginData.email, loginData.password, location, history)
        e.target.reset();
    }

    authError && Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: authError,

    })
    return (
        <Box >
            <form onSubmit={handleLoginSubmit}>

                <TextField
                    sx={{ width: 1 }}
                    required
                    id="standard-password-email"
                    label="You Email"
                    type="email"
                    name="email"
                    autoComplete="current-email"
                    variant="standard"
                    onChange={login}
                    color="secondary"

                ></TextField> <br />
                <TextField
                    sx={{ width: 1 }}
                    required
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={login}
                    color="secondary"
                />
                <Button color="secondary" type="submit" sx={{ width: 1, mt: 5 }} variant="contained">Login</Button>

            </form>

        </Box>
    );
};

export default Login;