import React, { useState } from 'react'
import { Grid, Stack } from '@mui/material'

import SimpleButton from '../ui-component/Buttons/SimpleButton';
import TextField from '../ui-component/Textfields/TextField'

import ViewPolicyDetails from '../ui-component/Dialog/ViewPolicyDetails'

function CategoryPage() {


  const [attributeCreationFormStatus, setattributeCreationFormStatus] = useState(false);
  const [CategoryName, setcategoryName] = useState('');
  const [attributeList, setattributeList] = useState([]);



  const createAttributeClick = () => {
    setattributeCreationFormStatus(true);
  }

  const closeAttributeDialogBox = () => {
    setattributeCreationFormStatus(false);
  }

  const getAttributeData = (data) => {

    console.log(data);
    setattributeList(prev => [...prev, data])
  }


  return (
    <Grid container>
      <ViewPolicyDetails openState={attributeCreationFormStatus} sentBackData={getAttributeData} changeOpenState={closeAttributeDialogBox} />

      <Grid container>
        <Grid item lg={4}>
          <TextField label='Category Name' />
        </Grid>
        <Grid container justifyContent={'space-between'} width={'100%'} mt={2} >
          <Grid item lg={4}>
            <h3>Attribute</h3>
          </Grid>
          <Grid item lg={2}>
            <SimpleButton buttonName='Create Attribute' onClickActn={createAttributeClick} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container >
          <Grid item md={12} lg={12} >
            <Grid container>
              {
                attributeList.map((attribute) => {
                  return <>
                    <Grid item  md={4} lg={4}>
                      {attribute.name}
                    </Grid >
                    <Grid item md={4}  lg={2}>
                      {attribute.fieldType}
                    </Grid >
                    <Grid item md={4}  lg={6}>
                      {(attribute.possibleValues).map((value) => {
                        return <>&nbsp;{value}&nbsp;</>
                      })}
                    </Grid >
                  </>
                })
              }
            </Grid >
          </Grid>
        </Grid>
    </Grid>
  )
}

export default CategoryPage