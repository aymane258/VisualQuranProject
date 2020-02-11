import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


export default function CheckboxLabels(props) {
  const [state, setState] = React.useState(props.currentCheck);
  const handleChange = event => {
    setState(event.target.checked);
    props.onRepeat(event.target.checked)
    console.log(event.target.checked)
  };

  return (
      <FormControlLabel
        control={<Checkbox checked={state}  icon={<AllInclusiveIcon />} checkedIcon={<AllInclusiveIcon />} onChange={handleChange} value="onRepeat" />}
        label="Listen On Repeat"
      />
      
   
  );
}
