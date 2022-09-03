import { Alert, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const RequestGet = () => {
    const [requestData, setRequestData] = useState([]) || ''
    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/api/v1/request')
            .then(res => res.json())
            .then(data => setRequestData(data))
    }, [setRequestData]);

    const deleteMassage = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://evening-woodland-47343.herokuapp.com/api/v1/request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            const deleted = requestData.filter(data => data._id !== id);
                            setRequestData(deleted);
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                    }

                    )



            }
        })




    }
    return (
        <>
            <Toolbar />
            <Typography variant='h5' sx={{ pb: 5 }}>Customer Request</Typography>

            {
                requestData?.map((request, index) =>
                    <div key={index}>
                        <Box severity="info" sx={{ mt: 2, p: 2, backgroundColor: '#e5f6fd' }} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography sx={{ color: 'red' }}> Email: {request?.email}</Typography>
                                    <Typography>Customer Name: {request?.name}</Typography>
                                    <Alert severity="info">Massage: {request?.massage}</Alert>
                                </div>

                                <div>
                                    <Button onClick={() => deleteMassage(request?._id)} size='small' variant="outlined" color='secondary'>Delete</Button>
                                </div>
                            </Box>
                        </Box>
                    </div>
                )
            }
        </>
    );
};

export default RequestGet;