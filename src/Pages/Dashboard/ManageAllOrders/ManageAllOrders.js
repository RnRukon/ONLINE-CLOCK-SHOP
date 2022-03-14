import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, TableBody, Divider, Fab, Typography, Toolbar, Box, TablePagination } from '@mui/material';
import ManageALlOrder from './ManageAllOrder/ManageALlOrder';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// fetch all order =========================


const ManageAllOrders = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        fetch('https://evening-woodland-47343.herokuapp.com/allOrder')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    // delete order Products ==================================


    const handleDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`https://evening-woodland-47343.herokuapp.com/manageAllOrderDelete/${id}`)

                .then(res => res.data.deletedCount &&
                    fetch('https://evening-woodland-47343.herokuapp.com/allOrder')
                        .then(res => res.json())
                        .then(data => setProducts(data))
                )
        setOpen(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    // handle set status ==========================

    const handleSetStatus = (status, statusId) => {

        const newData = { status }
        newData.color = 'rgb(34, 253, 0)'
        fetch(`https://evening-woodland-47343.herokuapp.com/statusUpdate/${statusId}`, {
            method: "PUT",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {

                    fetch('https://evening-woodland-47343.herokuapp.com/allOrder')
                        .then(res => res.json())
                        .then(data => setProducts(data))
                }
            })


    };

    return (
        <Box>
            <Toolbar />
            <Divider>
                <Fab
                    variant="extended"
                    size="small"
                    color="secondary"
                    aria-label="add">

                    <Typography
                        variant='body1'

                        sx={{ fontWeight: '900', fontSize: 20 }}
                    >Manage all Order</Typography>
                </Fab>

            </Divider>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                            <TableCell align="center">Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index) =>

                            <ManageALlOrder
                                key={product._id}
                                index={index}
                                product={product}
                                handleSetStatus={handleSetStatus}
                                handleDelete={handleDelete}

                            ></ManageALlOrder>

                        )}

                    </TableBody>

                </Table>
                <Divider/>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Stack spacing={2} sx={{ width: '100%' }}>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Delete success!
                    </Alert>
                </Snackbar>

            </Stack>
        </Box>
    );
};

export default ManageAllOrders;