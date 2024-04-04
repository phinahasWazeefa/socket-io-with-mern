
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
            priceAttributeType
        >
            <DialogContent>
                <Grid container>


                    <Grid item md={6}> <TextField label='Price Key Name' onChangeFn={addPriceKeyToPriceAttributeList} priceAttributeID={el.id} paymentAttributeID={paymentAttribute.id} /> </Grid>
                    <Grid item md={6}> <TextField label='Price Value' onChangeFn={addPriceValueToPriceAttributeList} priceAttributeID={el.id} paymentAttributeID={paymentAttribute.id} />  </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <SimpleButton buttonName="Close" onClickActn={changeOpenState} />
            </DialogActions>
        </Dialog>
    );
}
