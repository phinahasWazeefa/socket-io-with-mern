import * as React from 'react';
import Button from '@mui/material/Button';
import DownloadingIcon from '@mui/icons-material/Downloading';



export default function InputFileUpload({onClick,label='Upload file',startIcon=<DownloadingIcon sx={{fontSize:'1.7em !important'}} />,sxProps}) {

  const buttonClickFn = ()=>{
    console.log("Button Clicked");
    onClick();

  }

  return (
    <Button sx={{width:'100%',fontFamily:'Poppins',...sxProps}} fullWidth component="label" variant="contained" startIcon={startIcon} onClick={buttonClickFn}>
      {label}
    </Button>
  );
}