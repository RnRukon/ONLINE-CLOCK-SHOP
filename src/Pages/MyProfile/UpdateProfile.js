import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, TextField, } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import uploadImage from "../../Hooks/useImgUpload";
import PhotoCamera from '@mui/icons-material/PhotoCamera';



const Input = styled('input')({
    display: 'none',
});
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        width: "200px",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundImage: `linear-gradient(to right,#00bccf, #005593)`,
    },
}));
const UpdateProfile = ({ handleClose, open, scroll }) => {

    const { register, handleSubmit, reset } = useForm();
    const [photo, setPhoto] = useState("");
    const { user, updateUserProfile } = useAuth();



    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleImgUpload = (img) => {
        uploadImage(img).then((res) => {
            setPhoto(res.data.data.url);
        });
    };




    const onSubmit = async (data, e) => {
        e.preventDefault()
        const newUser = { ...data, email: user.email, photoURL: photo || user.photoURL };
        updateUserProfile(newUser.email, newUser?.displayName, newUser?.photoURL);
        handleClose();
        reset();

    };
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    Edit Profile
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <Box>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={classes.form}
                            noValidate
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        size="small"
                                        variant="filled"
                                        color='secondary'
                                        focused
                                        fullWidth
                                        label="Full Name"
                                        autoFocus
                                        defaultValue={user?.displayName}
                                        {...register("displayName", { required: true })}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <label htmlFor="icon-button-file">
                                        <Input
                                            onChange={e => handleImgUpload(e.target.files[0])}

                                            accept="image/png, image/jpg, image/jpeg" id="icon-button-file"
                                            type="file" />
                                        <Button
                                            color="primary"
                                            aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                            Image
                                        </Button>
                                    </label>
                                </Grid>


                            </Grid>
                            <Grid
                                container
                                spacing={1}
                                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button

                                        type="submit"
                                        size="small"
                                        variant="contained"
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateProfile;