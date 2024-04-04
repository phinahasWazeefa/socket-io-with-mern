
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";


function TextFieldWithIcon({placeholder="placeholder",onChangeFn,icon,type}) {
 


  return (
    <>
      
      <OutlinedInput
      sx={{
        '& input:-webkit-autofill': {
          boxShadow: '0 0 0 1000px white inset',
        },
      }} 
        id="outlined-adornment"
        type={type}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
            >
            {icon}
            </IconButton>
          </InputAdornment>
        }
        onChange={(e)=>onChangeFn(e.target.value)}
      />
    </>
  );
}

export default TextFieldWithIcon;
