import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function Ratting() {
    const [value, setValue] = React.useState(2);

    return (
        <div className='container'>

            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <h2>Give us your valuable rating!</h2>
                <Rating
                    onClick={() => { alert("Thanks for your rating") }}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
        </div>
    );
}
