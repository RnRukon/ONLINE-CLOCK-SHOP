import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Box, Container, TextField, Divider, Toolbar } from '@mui/material';
import './PorterToday.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';

import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const RequestToday = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [requestData, setRequestData] = useState({});

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...requestData }
        newLoginData[field] = value;
        setRequestData(newLoginData)

    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetch('https://evening-woodland-47343.herokuapp.com/request', {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    alert('Request Massage success')
                }
            })


        handleClose()
    }

    return (
        <Container>

            <Box >
                <Divider>
                    <Typography variant='h4'>Request Today!</Typography>
                </Divider>
                <Toolbar/>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Box>
                        <img src="https://i.ibb.co/HxBh7Vn/5a914c1cb15d5c051b3690af.png" alt="" />
                    </Box>
                    <Box sx={{py:2}}>
                       
                        <Button onClick={handleOpen} variant='contained' color="secondary">Request Now</Button>
                    </Box>
                </Box>
            </Box>
            <Toolbar />
            {/* ------------------------------------------------------------------------- */}



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" color="secondary" variant="h6" component="h2">
                            Become a Request Today!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleOnSubmit}>
                                <TextField
                                    sx={{ width: 1 }}
                                    id="standard-basic"
                                    label="Email"
                                    color="secondary"
                                    variant="standard"
                                    name='email'
                                    onChange={handleOnBlur}
                                />
                                <TextField
                                    sx={{ width: 1 }}
                                    id="standard-basic"
                                    label="Name"
                                    color="secondary"
                                    variant="standard"
                                    name='name'
                                    onChange={handleOnBlur} /> <br />
                                <TextField
                                    sx={{ width: 1 }}
                                    multiline
                                    id="standard-basic"
                                    label="Massage"
                                    color="secondary"
                                    variant="standard"
                                    name="massage"
                                    onChange={handleOnBlur} /> <br /> <br />
                                <Button
                                    type='submit'

                                    className='my-11 '
                                    variant='contained'
                                    color="secondary"
                                >Send Request</Button>
                            </form>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>

        </Container>
    );
};

export default RequestToday;