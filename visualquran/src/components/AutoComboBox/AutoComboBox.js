/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
    return (
      <Autocomplete 
        options={props.list}
        getOptionLabel={option => option.reciter_name_eng || option.name_simple || option.language_name}
        renderOption={option => (
          <React.Fragment>
            {option.reciter_name_eng} {option.style}
            {option.chapter_number} {option.name_simple} 
            {option.language_name? option.language_name.concat(" by ", option.author_name) : null}
          </React.Fragment>
        )}
        style={{ width: 200 }}
        renderInput={params => (
          <TextField  key={props.label} onChange={()=>props.changed({...params})}{...params} label={props.label} variant="filled" fullWidth />
        )}
      />
    );
  }


