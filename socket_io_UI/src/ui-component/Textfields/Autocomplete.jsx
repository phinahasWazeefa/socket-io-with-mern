import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({optionValues=[],onChangeFn,displayKey='id',label='Parts'}) {
  return (
    <Autocomplete

      disablePortal
      id="combo-box-demo"
      options={optionValues}
      getOptionLabel={(option) => option[displayKey]}
      onChange={(event, value) => { onChangeFn(value ? value.Item_Serial : null) }}
      sx={{ width: '100%',backgroundColor:'white' }}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

