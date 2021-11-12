import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Button, TableRow, TableCell, TableBody } from '@mui/material';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ManageAllOrders = () => {
    const [products, setProducts] = useState([]);
    const [orderId, setOrderId] = useState("");
    useEffect(() => {
        fetch('http://localhost:5000/allOrder')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    // delete order Products ==================================

    const handleDelete = (id) => {
        window.confirm("Are you sure you wish to delete this item?") &&
            axios.delete(`http://localhost:5000/manageAllOrderDelete/${id}`)

                .then(res => res.data.deletedCount &&
                    fetch('http://localhost:5000/allOrder')
                        .then(res => res.json())
                        .then(data => setProducts(data))
                )
    }




    const handleIdChange = (setId) => {
        setOrderId(setId)
        console.log(orderId)
    }


    const handleChange = (event) => {
        // console.log(event?.props?.children);
        const status = event.target.value;

        const newData = { status }
        newData.color = 'rgb(34, 253, 0)'
        console.log(newData)

        fetch(`http://localhost:5000/statusUpdate/${orderId}`, {
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
                    fetch('http://localhost:5000/allOrder')
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

                        {products.map((product) => (


                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell component="th" scope="row">
                                    {product?.name}
                                </TableCell>
                                <TableCell align="center">{product?.email}</TableCell>
                                <TableCell align="center">{product?.date}</TableCell>
                                <TableCell align="center">{product?.title}</TableCell>
                                <TableCell align="center">{product?.price}</TableCell>
                                <TableCell align="center">
                                    <FormControl onClick={() => handleIdChange(product._id)} sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Action</InputLabel>

                                        <Select
                                            onClick={() => handleIdChange(product._id)}
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            defaultValue={product.status}
                                            onChange={handleChange}
                                            autoWidth
                                            label={product.status}

                                        >

                                            <MenuItem onClick={() => handleIdChange(product._id)} value="Rejected">Rejected</MenuItem>
                                            <MenuItem onClick={() => handleIdChange(product._id)} value="Shipped">Shipped</MenuItem>

                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">

                                    <Button onClick={() => handleDelete(product?._id)}
                                        variant="contained"
                                        color='error'
                                        sx={{ p: 0, }}
                                    >delete</Button>
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>
                </Table>
            </TableContainer>


            {/* {
                products.map(product => <ManageALlOrder
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                    handleUpdateStatus={handleUpdateStatus}
                    setIsStatus={setIsStatus}

                ></ManageALlOrder>)
            } */}
        </div>
    );
};

export default ManageAllOrders;