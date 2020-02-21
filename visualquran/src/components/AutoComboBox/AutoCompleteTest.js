/* eslint-disable no-use-before-define */
import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  label: {
    display: 'block',
  },
  input: {
    width: 200,
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}));

export default function UseAutocomplete(props) {

    const [value, setValue] = React.useState(props.defaultValue || '')

    const handleChange = event => {
  
      setValue(event.target.value);
      console.log(event.target.value)
    };
  

  const classes = useStyles();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: props.list,
    getOptionLabel: option => option.name_simple,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <label className={classes.label} {...getInputLabelProps()}>
          useAutocomplete
        </label>
        <input className={classes.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li onClick={(event) => { props.changed(event.target.value, props.type); handleChange(event) }}  key={option.name_simple + index} {...getOptionProps({ option, index })}>{option.name_simple}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

