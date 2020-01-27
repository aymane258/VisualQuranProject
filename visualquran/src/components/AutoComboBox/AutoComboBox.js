/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={recitators}
        getOptionLabel={option => option.recitator}
        style={{ width: 200 }}
        renderInput={params => (
          <TextField {...params} label="Surah" variant="filled" fullWidth />
        )}
      />
    );
  }
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const recitators = [
  {recitator:"Surah Kahf"},
  {recitator:"by Idris Abkar"}
];
