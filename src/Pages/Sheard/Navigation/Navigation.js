import Button from '@mui/material/Button';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
const Navigation = () => {
    const { user, logOut } = useAuth();

    const style = {
        fontWeight: "bold",
        color: "Yellow"
    }

    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'black' }} variant="dark">
            <Container>
                <Navbar.Brand href="#home">Clock Online Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} style={style} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} style={style} to="/products">Products</Nav.Link>

                        {
                            user.email && <Nav.Link as={NavLink} style={style} to="/dashboard">Dashboard</Nav.Link>
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