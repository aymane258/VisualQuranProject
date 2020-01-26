import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FormPropsTextFields() {

  return (
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />

    
    
  );
}