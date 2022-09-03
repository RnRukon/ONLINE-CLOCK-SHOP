import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import useAuth from '../../Hooks/useAuth';
import AdminRoute from './AdminRoute/AdminRoute';
import { Switch, Route, NavLink, useRouteMatch, useLocation } from "react-router-dom";
import AddedProduct from './AddedProduct/AddedProduct';
import MyOrder from './UserDashboard/MyOrder/MyOrder';
import ManageAllOrders from './ManageAllOrders/ManageAllOrders';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import UpdateProductFrom from './UpdateProduct/UpdateProductFrom/UpdateProductFrom';
import Review from './UserDashboard/Review/Review';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PreviewIcon from '@mui/icons-material/Preview';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RequestGet from './RequestGet/RequestGet';
import Footer from '../Sheard/Footer/Footer';
import { Avatar, Badge, Container, ListItemText, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import MyProfile from '../MyProfile/MyProfile';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const drawerWidth = 240;

const useStyles = makeStyles({
    paper: {
        background: "#09315c"
    }
});
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { admin, logOut, user } = useAuth();
    const dashboard = () => {
        setMobileOpen(!mobileOpen);
    };
    let { path, url } = useRouteMatch();
    const location = useLocation().pathname;
    const classes = useStyles();

    const iconsStyle = { textDecoration: 'none', color: 'white' }
    const drawer = (
        <div >

            <List>
                <ListItem button >
                    <ListItemIcon>
                        <Stack direction="row" spacing={2}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src={user.photoURL} />
                            </StyledBadge>
                        </Stack>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ color: 'white' }}
                        primary={user.displayName} />
                </ListItem>

            </List>
            <Toolbar />
            <Divider />


            <List >
                <NavLink to='/' style={iconsStyle}>
                    <ListItem button >
                        <ListItemIcon>
                            <HomeIcon sx={iconsStyle} />
                        </ListItemIcon>
                        <ListItemText

                            primary='Go to Home' />
                    </ListItem>
                </NavLink>
                <NavLink to={`${url}/myProfile`} style={iconsStyle}>
                    <ListItem button >
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon sx={iconsStyle} />
                        </ListItemIcon>
                        <ListItemText
                            onClose={dashboard}
                            primary='My Profile' />
                    </ListItem>

                </NavLink>
                {!admin && <Box>
                    <NavLink to={`${url}`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <ProductionQuantityLimitsIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='MY Order' />
                        </ListItem>
                    </NavLink>

                    <NavLink to={`${url}/review`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <PreviewIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Review' />
                        </ListItem>
                    </NavLink>
                </Box>}

                {admin && <Box>
                    <NavLink to={`${url}`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <AddShoppingCartIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Manage All Orders' />
                        </ListItem>

                    </NavLink>
                    <NavLink to={`${url}/makeAdmin`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <AdminPanelSettingsIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Make Admin' />
                        </ListItem>

                    </NavLink>

                    <NavLink to={`${url}/updateProduct`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <AddPhotoAlternateIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Update Product' />
                        </ListItem>
                    </NavLink>
                    <NavLink to={`${url}/addedProduct`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <LogoutIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Add a Product' />
                        </ListItem>
                    </NavLink>
                    <NavLink to={`${url}/request`} style={iconsStyle}>
                        <ListItem button >
                            <ListItemIcon>
                                <AnnouncementOutlinedIcon sx={iconsStyle} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Request' />
                        </ListItem>
                    </NavLink>
                </Box>}

                <ListItem button onClick={logOut} sx={iconsStyle} >
                    <ListItemIcon>
                        <InboxIcon sx={iconsStyle} />
                    </ListItemIcon>
                    <ListItemText
                        primary='Logout' />
                </ListItem>
            </List>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar

                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: 'flex',
                    bgcolor: 'rgb(1, 24, 55)'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={dashboard}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div">

                        {location === '/'
                            ? 'Dashboard'
                            : location.toUpperCase().replace('/', '')}

                    </Typography>


                </Toolbar>

            </AppBar>
            <Box

                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
                aria-label="mailbox folders"

            >
                {/* The implementation can be swapped with js to avoid SEO duplication of NavLinks. */}
                <Drawer
                    classes={{ paper: classes.paper }}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={dashboard}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}


                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.paper }}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Container>
                    <Switch>
                        {!admin && <Route exact path={path}>
                            <MyOrder></MyOrder>
                        </Route>}
                        {admin && <Route exact path={path}>
                            <ManageAllOrders></ManageAllOrders>
                        </Route>}

                        <Route exact path={`${path}/review`}>
                            <Review></Review>
                        </Route>
                        <Route exact path={`${path}/myProfile`}>
                            <MyProfile></MyProfile>
                        </Route>
                        <AdminRoute exact path={`${path}/makeAdmin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <AdminRoute exact path={`${path}/updateProduct`}>
                            <UpdateProduct></UpdateProduct>
                        </AdminRoute>
                        <AdminRoute exact path={`${path}/updateProductFrom/:id`}>
                            <UpdateProductFrom></UpdateProductFrom>
                        </AdminRoute>
                        <AdminRoute exact path={`${path}/addedProduct`}>
                            <AddedProduct></AddedProduct>
                        </AdminRoute>
                        <AdminRoute exact path={`${path}/request`}>
                            <RequestGet></RequestGet>
                        </AdminRoute>

                    </Switch>
                </Container>
                <Toolbar />
                <Footer />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
