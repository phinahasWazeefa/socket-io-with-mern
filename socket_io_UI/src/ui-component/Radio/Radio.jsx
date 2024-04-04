import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import {convertMonthToYear} from '../../utils/commonFunctions'


export default function RadioButtonsGroup({ options = [], handleRadioChange, directionRow = true }) {
    return (

        <RadioGroup
            fullwidth
            row={directionRow}
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleRadioChange}
        >
            {options.map((option) => {
                return <FormControlLabel value={option.Selling_Policy_Type} control={<Radio />} label={`${option.Selling_Policy_Name} - ${convertMonthToYear(option.Period)} - ${option.Price}KWD`} />

            })

            }

        </RadioGroup>

    );
}