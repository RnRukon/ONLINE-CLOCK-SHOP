import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const NoteFound = () => {
    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center",height:'100vh',textAlign:'center'}}>
           <Box>
           <h1>Note Found Page</h1>
            <Typography variant='h1'sx={{fontWeight:'900',fontFamily:'fantasy'}}>4<span style={{color:'red'}}>0</span>4</Typography>
         
                <Button variant="outlined" 
                onClick={()=>window.history.back()}>Back</Button>
                
           </Box>
        </Box>
    );
};

export default NoteFound;