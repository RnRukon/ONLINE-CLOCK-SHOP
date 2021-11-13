import React from 'react';
import Button from '@mui/material/Button';
import { Typography, Box, Container, TextField } from '@mui/material';
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


const PorterToday = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOnSubmit = (e) => {
        e.preventDefault()
        handleClose()
    }

    return (
        <Box className='PorterToday-bg  py-44'>
            <Container className='d-flex justify-content-center '>
                <Box className='text-center bg-gray-900 p-5'>
                    <Box className='d-flex'>
                        <img className='w-20 text-center m-auto' src="https://i.ibb.co/HxBh7Vn/5a914c1cb15d5c051b3690af.png" alt="" />
                    </Box>
                    <Typography className='py-6 text-yellow-500 fw-bold' variant='h4'>CLock</Typography>
                    <Typography className=' text-pink-600' variant='h4'>Become a Request Today!</Typography>

                    <Button onClick={handleOpen} className='my-11 ' variant='contained' color="secondary">Send Request</Button>
                </Box>
            </Container>

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
                            Become a Potter Today!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleOnSubmit}>
                                <TextField
                                    sx={{ width: 1 }}
                                    id="standard-basic"
                                    label="Email"
                                    color="secondary"
                                    variant="standard" />
                                <TextField
                                    sx={{ width: 1 }}
                                    id="standard-basic"
                                    label="Name"
                                    color="secondary"
                                    variant="standard" /> <br />
                                <TextField
                                    sx={{ width: 1 }}
                                    id="standard-basic"
                                    label="Massage"
                                    color="secondary"
                                    variant="standard" /> <br /> <br />
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

        </Box>
    );
};

export default PorterToday;