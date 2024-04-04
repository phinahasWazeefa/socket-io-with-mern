
import React, { useEffect, useState } from 'react'


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TextField from '../Textfields/TextField';
import SimpleButton from '../Buttons/SimpleButton';
import DropDown from '../DropDown/DropDown';





export default function SimpleHtmlModal({
  openState = false,
  changeOpenState,
  sentBackData

}) {
  const [attributeName, setattributeName] = useState("");
  const [suggestionValue, setsuggestionValue] = useState("");
  const [suggestionValues, setsuggestionValues] = useState([]);
  const [attributeDisplayType, setattributeDisplayType] = useState("");


  const addToSuggestionArray = () => {
    setsuggestionValues(prevArry => [...prevArry, suggestionValue]);
    setsuggestionValue("");
  }

  const createAttribute = () => {
    try {

      sentBackData({ name: attributeName, required: true, possibleValues: suggestionValues, fieldType: attributeDisplayType });
      setsuggestionValues([]);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const setDisplayType = (val) => {
    setattributeDisplayType(val)
  }


  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      height={'100vh'}
      open={openState}
      onClose={changeOpenState}
    >
      <DialogContent>
        <Grid container justifyContent={'space-between'}>
          <Grid item lg={3}>
            <TextField label={'Attribute Name'} onChangeFn={setattributeName} />
          </Grid>
          <Grid item lg={3} sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField label={'Suggestion Values'} onChangeFn={setsuggestionValue} displayValue={suggestionValue} />
            <AddIcon sx={{ mt: 1.5, ml: 2 }} onClick={addToSuggestionArray} />
          </Grid>
          <Grid item lg={3}>
            <DropDown label={'Display Type'} optionsList={[{ name: "string" }, { name: "number" }, { name: "dropdown" }, { name: "boolean" }]} optionDisplayName={'name'} optionKeyName={'name'} setSelectedValueFunction={setDisplayType} />
          </Grid>
          <Grid item lg={3} pt={1}>
            <SimpleButton buttonName="Create Attribute" onClickActn={createAttribute} />
          </Grid>
        </Grid>
        <Grid item lg={12} mt={2} >
          {suggestionValues.map((val) => {
            return <>&nbsp;{val}&nbsp;</>
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <SimpleButton buttonName="Close" onClickActn={changeOpenState} />
      </DialogActions>
    </Dialog>
  );
}
