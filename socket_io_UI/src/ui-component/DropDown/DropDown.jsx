import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({optionsList=[],optionDisplayName,optionKeyName,label,defaultValue,setSelectedValueFunction,paymentAttributeID}) {


  console.log(defaultValue);

  const handleChange = (event) => {
    setSelectedValueFunction(event.target.value,paymentAttributeID);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={defaultValue}
          label={label}
          onChange={handleChange}
        >
            {
                optionsList.map((option)=>{
                    return <MenuItem value={option[optionKeyName]}>{option[optionDisplayName]}</MenuItem>
                })
            }
          
        </Select>
      </FormControl>
    </Box>
  );
}