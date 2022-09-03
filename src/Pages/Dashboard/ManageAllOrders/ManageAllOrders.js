import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, TableBody, Divider, Fab, Typography, Toolbar, Box, TablePagination } from '@mui/material';
import ManageALlOrder from './ManageAllOrder/ManageALlOrder';
import Swal from 'sweetalert2';



// fetch all order =========================


const ManageAllOrders = () => {
    const [products, setProducts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);



    const fetchingData = () => {
        fetch('https://evening-woodland-47343.herokuapp.com/api/v1/orders')
            .then(res => res.json())
            .then(data => setProducts(data))
    }
    useEffect(() => {
        fetchingData()
    }, [])


    // delete order Products ==================================


    const handleDelete = (id) => {
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

                axios.delete(`https://evening-woodland-47343.herokuapp.com/api/v1/orders/${id}`)
                    .then(res => {

                        if (res.data.deletedCount === 1) {
                            fetchingData()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })


    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };





    // handle set status ==========================

    const handleSetStatus = (status, statusId) => {

        const newData = { status }
        newData.color = 'rgb(34, 253, 0)';

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


                axios.put(`https://evening-woodland-47343.herokuapp.com/api/v1/orders/${statusId}`, newData)
                    .then(res => {

                        if (res.status === 200) {
                            fetchingData()

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
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

                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) =>

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
                <Divider />
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

        </Box>
    );
};

export default ManageAllOrders;