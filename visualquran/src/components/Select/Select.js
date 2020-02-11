import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function NativeSelects(props) {

  const [value, setValue] = React.useState(props.defaultValue || '')

  const handleChange = event => {

    setValue(event.target.value);
    console.log(event.target.value)
  };

  
  const data = props.list.map((item, id) => {
    if (item.reciter_name_eng) {

      return <option key={item.reciter_name_eng + id} value={item.id}>{item.reciter_name_eng} {item.style}</option>
    }
    //if its not null 
    if (item.name_simple) {
      return <option key={item.name_simple + id} value={item.chapter_number}>{item.chapter_number}. {item.name_simple}</option>
    }
    if (item.language_name) {
      return <option key={item.language_name + id} value={item.id}>{item.language_name} by {item.author_name}</option>
    }
    return null

  })

  return (

    <div>
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-age-native-simple">{props.type}</InputLabel>
        <Select
          native
          value={value}
          onChange={(event) => { props.changed(event.target.value, props.type); handleChange(event) }}>
          <option value={null}> </option>
          }
   {data}

        </Select>
      </FormControl>

    </div>
  );
}