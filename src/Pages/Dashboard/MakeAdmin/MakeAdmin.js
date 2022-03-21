import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
const MakeAdmin = () => {

    const { register, handleSubmit, reset } = useForm();


    const handleAddAdmin = (data) => {


        fetch('https://evening-woodland-47343.herokuapp.com/users/admin', {
            method: "PUT",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )
                    reset();
                }
            })
    }
    return (
        <div>
            <Typography variant='h6' color="secondary">Make Admin</Typography>
            <Box className='row'>
                <Box className="col-lg-6">
                    <form onSubmit={handleSubmit(handleAddAdmin)}>

                        <TextField
                            {...register("email", { required: true })}
                            color="secondary"
                            sx={{ width: 1 }}
                            label="Email"
                            type="email"
                            variant="standard" />
                        <Button sx={{ width: 1, mt: 5 }} color="secondary" type='submit' variant='contained' >Add Admin</Button>

                    </form>
                </Box>
                <Box className='col-lg-6'>
                    <img style={{ width: '100%' }} src="https://i.ibb.co/6wczVJp/login-img.png" alt="" />
                </Box>
            </Box>
        </div>
    );
};

export default MakeAdmin;