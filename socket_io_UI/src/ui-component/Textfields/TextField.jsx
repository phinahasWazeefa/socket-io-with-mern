import React from 'react';
import TextField from '@mui/material/TextField';

function SimpleTextField({ type='text', priceAttributeID, paymentAttributeID, variant = 'outlined', label = 'outlined', onChangeFn, disabled = false, displayValue,sxProps,readOnly=true,required=false, ...otherProps  }) {
  
 
  const setValue = (e) => {
    if (type === 'text') {
      const regex = /^[a-zA-Z0-9 ]*$/;
  
      // If it's a paste event or direct input, clean the input
      const cleanedText = e.clipboardData
        ? e.clipboardData.getData('text/plain').replace(/[^A-Za-z0-9\s]/g, '')
        : e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
  
      onChangeFn(cleanedText,priceAttributeID,paymentAttributeID);
    } else {
      onChangeFn(e.target.value,priceAttributeID,paymentAttributeID);
    }
  };
  
  
  
  return (
    <TextField
    required={required}
  
    type={type}
     label={label} 
     variant={variant}
     onChange={setValue}
     fullWidth 
     disabled={disabled}
     value={displayValue}
    {...otherProps}
 
    />
  )
}

export default SimpleTextField