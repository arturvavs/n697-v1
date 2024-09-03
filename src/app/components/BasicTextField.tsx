import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldCustom(value: string) { 
    return(
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Obrigatório"
          value={value}
        />
    );
}