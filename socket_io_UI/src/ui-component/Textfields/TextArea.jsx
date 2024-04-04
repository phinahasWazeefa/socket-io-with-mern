import React from 'react';
import TextField from '@mui/material/TextField';

function SimpleTextarea({ label = 'outlined', onChangeFn, disabled = false, displayValue, sxProps, rows = 6.5, type = 'text', ...otherProps }) {

  const setValue = (e) => {
    if (type === 'text') {
      const regex = /^[a-zA-Z0-9 ]*$/;
  
      // If it's a paste event or direct input, clean the input
      const cleanedText = e.clipboardData
        ? e.clipboardData.getData('text/plain').replace(/[^A-Za-z0-9\s]/g, '')
        : e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
  
      onChangeFn(cleanedText);
    } else {
      onChangeFn(e.target.value);
    }
  };
  

  return (
    <TextField
      sx={{
        '& .MuiInputBase-inputMultiline': {
          backgroundColor: 'white',
          '&:-webkit-autofill': {
            boxShadow: '0 0 0 1000px white inset',
          },
          ...sxProps?.['& .MuiInputBase-inputMultiline'],
        },
      }}
      type={type}
      id="outlined-multiline"
      label={label}
      multiline
      rows={rows}
      onChange={setValue}
      fullWidth
      disabled={disabled}
      value={displayValue}
      {...otherProps}
    />
  );
}

export default SimpleTextarea;
