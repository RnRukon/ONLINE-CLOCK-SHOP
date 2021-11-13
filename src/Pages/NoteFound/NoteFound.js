import { Button } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
const NoteFound = () => {
    return (
        <div className='mt-64 text-center'>
            <h1>Note Found</h1>
            <h1 className='text-8xl'>4<span className='text-red-600'>0</span>4</h1>
            <Link to='/'><Button>Back</Button></Link>
        </div>
    );
};

export default NoteFound;