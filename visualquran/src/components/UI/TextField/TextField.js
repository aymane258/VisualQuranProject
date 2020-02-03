import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FormPropsTextFields() {

  return (
    
        <TextField
         id="outlined-size-small"
         defaultValue="1"
          variant="outlined"
          size="small"
          label="ayah"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />

    
    
  );
}