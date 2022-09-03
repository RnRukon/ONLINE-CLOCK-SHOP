import React from 'react';
import { Grid, TextField, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
const MakeAdmin = () => {

    const { register, handleSubmit, reset } = useForm();


    const handleAddAdmin = (data) => {


        fetch('https://evening-woodland-47343.herokuapp.com/api/v1/users/admin', {
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
            <Toolbar />
            <Typography variant='h6' color="secondary">Make Admin</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={4} md={6}>
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
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                    <img src="https://i.ibb.co/6wczVJp/login-img.png" alt="" />
                </Grid>
            </Grid>
        </div>
    );
};

export default MakeAdmin;