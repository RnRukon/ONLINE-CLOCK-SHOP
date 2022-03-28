import React from 'react';
import { Avatar, Box, Divider, Fab, Grid, IconButton, List, ListItem, ListItemText, styled, Toolbar } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import useAuth from '../../Hooks/useAuth';
import uploadImage from '../../Hooks/useImgUpload';
import UpdateProfile from './UpdateProfile';

const Input = styled('input')({
    display: 'none',
});
const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState();

  


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setScroll();
        setOpen(true);
    };

    const handleImgUpload = img => {
        uploadImage(img)
            .then(res => {
                updateUserProfile(user.email, user.displayName, res.data.data.url)

            })
    }
    return (
        <Box>
            <br />
            <Divider textAlign="left">
                <Fab variant="extended" size="small" color="secondary" aria-label="add">

                    My Profile
                </Fab>
            </Divider>
            <Divider textAlign="right">
                <Fab
                onClick={handleOpen}
                    variant="extended"
                    size="small"
                    color="primary"
                    sx={{
                        bgcolor: '#09315c', '&:hover': {
                            background: "#0553a5cc",
                        }
                    }} aria-label="add">
                    Edit Profile
                </Fab>

            </Divider>
            <Toolbar />
            <Grid container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={3}
                    sx={{ textAlign: 'center' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            sx={
                                {
                                    width: { xs: 100, sm: 200, md: 200 },
                                    height: { xs: 100, sm: 200, md: 200 },
                                }
                            }
                            alt="Profile"
                            src={user.photoURL} />
                    </Box>
                    <br />
                    <Fab variant="extended" size="small" color="primary" aria-label="add">
                        <label htmlFor="icon-button-file">
                            <Input
                                onChange={e => handleImgUpload(e.target.files[0])}
                                accept="image/png, image/jpg, image/jpeg" id="icon-button-file"
                                type="file" />
                            <IconButton aria-label="upload picture" component="span">
                                <AddAPhotoIcon sx={{ mr: 1, color: 'white' }} />
                            </IconButton>
                            Change
                        </label>




                    </Fab>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemText>
                                Name:
                            </ListItemText>
                            <ListItemText
                                primary={user.displayName}

                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemText>
                                email:
                            </ListItemText>
                            <ListItemText
                                primary={user.email}

                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemText>
                                Number:
                            </ListItemText>
                            <ListItemText
                                primary={user.number ? user.number : '+880 17xxxxxxx'}

                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />

                    </List>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>

                </Grid>
            </Grid>

            <UpdateProfile
                handleClose={handleClose}
                open={open}
                scroll={scroll}
            />
        </Box>
    );
};

export default MyProfile;