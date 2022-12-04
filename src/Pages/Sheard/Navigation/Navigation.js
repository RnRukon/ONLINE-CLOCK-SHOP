import Button from '@mui/material/Button';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
const Navigation = () => {
    const { user, logOut } = useAuth();

    const style = {
        fontWeight: "bold",
        color: "waite"
    }
    const location = useLocation().pathname;
    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" style={{ backgroundColor: '#011837' }} variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={style}>
                    {location === '/'
                        ? 'ONLINE CLOCK SHOP'
                        : location.toUpperCase().replace('/', '')}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: 'auto' }}>
                        <Nav.Link as={NavLink} style={style} to="/"><Button sx={{ color: '#fff' }}>Home</Button></Nav.Link>
                        <Nav.Link as={NavLink} style={style} to="/products"><Button sx={{ color: '#fff' }}>Products</Button></Nav.Link>

                        {
                            user.email && <Nav.Link as={NavLink} style={style} to="/dashboard"><Button sx={{ color: '#fff' }}>Dashboard</Button></Nav.Link>
                        }

                        {
                            user.displayName &&
                            <Nav.Link ><Button sx={{ color: '#fff' }} style={style} variant="text">{user.displayName}</Button></Nav.Link>
                        }
                        {user.email ?
                            <Nav.Link ><Button sx={{ color: '#fff' }} style={style} onClick={logOut}>Logout</Button></Nav.Link>
                            :
                            <Nav.Link as={NavLink} to="/login"><Button style={style} sx={{ color: '#fff', display: 'inline' }}>Login</Button></Nav.Link>
                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;