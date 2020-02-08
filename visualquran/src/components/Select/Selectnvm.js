import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

 const handleChange = event => {
    
    setValue(event.target.value);
    console.log(event.target.value)
  };

    const data = props.list.map((item,id) => {
    if(item.reciter_name_eng){
    return <MenuItem  key={item.reciter_name_eng+id} value={item.id}>{item.reciter_name_eng} {item.style}</MenuItem >
    }
    //if its not null 
    if(item.name_simple){
    return <MenuItem  key={item.name_simple+id} value={item.chapter_number}>{item.chapter_number}. {item.name_simple}</MenuItem >
    }
    if(item.language_name){
    return <MenuItem  key={item.language_name+id} value={item.id}>{item.language_name} by {item.author_name}</MenuItem >
     }
     return null

})

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {props.type}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
         value={value}
          onChange={(event) => { props.changed(event.target.value, props.type); handleChange(event) }}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
  {data}
        </Select>
      </FormControl>
     
    </div>
  );
}
