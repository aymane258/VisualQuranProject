import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


export default function CheckboxLabels() {
  return (
      <FormControlLabel
        control={<Checkbox icon={<AllInclusiveIcon />} checkedIcon={<AllInclusiveIcon />} value="checked" />}
        label="Listen On Repeat"
      />
      
   
  );
}
