import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TableRow, TableCell } from '@mui/material';


const ManageALlOrder = (props) => {
    const { product_name, ship_postcode, date, cus_email, cus_name, status, color, _id } = props?.product;
    const { handleSetStatus, index } = props;

    const handleChange = (event) => {
        const status = event?.target?.value;
        handleSetStatus(status, _id)

    }

    return (




        <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

        >
            <TableCell component="th" scope="row">
                {index}
            </TableCell>
            <TableCell component="th" scope="row">
                {cus_name}
            </TableCell>
            <TableCell align="center">{cus_email}</TableCell>
            <TableCell align="center">{date}</TableCell>
            <TableCell align="center">{product_name}</TableCell>
            <TableCell align="center">{ship_postcode}</TableCell>
            <TableCell align="center">
                <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Action</InputLabel>

                    <Select
                        sx={{ color: { color } }}
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={status}
                        onChange={handleChange}
                        autoWidth
                        label={status}
                    >

                        <MenuItem value={status}>{status}</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="center">

                <Button onClick={() => props?.handleDelete(_id)}
                    variant="contained"
                    color='error'
                    sx={{ p: 0, }}
                >delete</Button>
            </TableCell>

        </TableRow>







    );
};

export default ManageALlOrder;