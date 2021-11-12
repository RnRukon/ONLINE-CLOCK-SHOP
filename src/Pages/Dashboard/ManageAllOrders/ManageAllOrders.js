import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { TableRow, TableCell, TableBody } from '@mui/material';
import ManageALlOrder from './ManageAllOrder/ManageALlOrder';





const ManageAllOrders = () => {
    const [products, setProducts] = useState([]);

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
    }







    const handleSetStatus = (status, statusId) => {

        const newData = { status }
        newData.color = 'rgb(34, 253, 0)'
        console.log(newData, statusId)

        fetch(`https://evening-woodland-47343.herokuapp.com/statusUpdate/${statusId}`, {
            method: "PUT",
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    // setSuccess(true)
                    fetch('https://evening-woodland-47343.herokuapp.com/allOrder')
                        .then(res => res.json())
                        .then(data => setProducts(data))
                }
            })


    };

    return (
        <div>
            <h1>Manage all Order {products?.length}</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
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

                        {products.map((product) =>

                            <ManageALlOrder
                                product={product}
                                handleSetStatus={handleSetStatus}
                                handleDelete={handleDelete}

                            ></ManageALlOrder>

                        )}

                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    );
};

export default ManageAllOrders;