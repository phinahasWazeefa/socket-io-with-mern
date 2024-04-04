import React from 'react'
import Button from '@mui/material/Button';

function SimpleButton({variant="contained",buttonName='contained', onClickActn,param1, btnSize="large",btnSX }) {

  const buttonClickAction = ()=>{
    onClickActn(param1);
  }

  return (
    <Button variant={variant} fullWidth sx={{width:'100%',fontFamily:'Poppins !important',...btnSX}} size={btnSize} onClick={buttonClickAction}>{buttonName}</Button>
  )
}

export default SimpleButton