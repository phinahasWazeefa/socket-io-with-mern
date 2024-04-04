import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material';

import TextField from '../ui-component/Textfields/TextField';
import DropDown from '../ui-component/DropDown/DropDown';
import SimpleButton from '../ui-component/Buttons/SimpleButton';

import axios from '../axios';



function ServiceListingPage() {

    const [services, setservices] = useState([]);
    const [paymentAttributesList,setpaymentAttributeList] = useState([]);

    useEffect(() => {
        axios.get('/admin/user-get-service').then((response) => {
            console.log(response.data)
            setservices(response.data.service);

        }).catch((error) => {
            console.log(error);
        });

    }, [])


    const addToPaymentAttributeList = (value, paymentAttributeName) => {
        setpaymentAttributeList(prev => {
            const updatedList = prev.map(el => {
                if (el.paymentAttributeName === paymentAttributeName) {
                    return { ...el, value: value }; // Update value if attribute name already exists
                }
                return el;
            });
            // If paymentAttributeName doesn't exist, add a new object
            if (!updatedList.some(el => el.paymentAttributeName === paymentAttributeName)) {
                updatedList.push({ paymentAttributeName: paymentAttributeName, value: value });
            }
            return updatedList;
        });
    };
    

    const calculatePriceForService = (serviceId)=>{

        axios.post('/admin/calculate-service-price',{serviceId:serviceId,paymentAttributes:paymentAttributesList}).then((response)=>{

            console.log(response.data);
            window.alert(response.data.serviceCost);

        }).catch((error)=>{

            console.log(error);
            throw error;

        });

    }


    return (
        <Grid container>

            {
                services.map((service) => {
                    return <Grid container sx={{ border: '1px solid #91C8E4', bgcolor: 'white', borderRadius: '12px', padding: '5px' }} mt={1.5}>

                        <Grid item md={5} lg={5}>

                            <h3 onClick={()=>console.log(paymentAttributesList)}>{service.name}</h3>

                        </Grid>
                        <Grid container>
                            {
                                (service.paymentAttributes).map((attribute) => {
                                    if (attribute.calculationType == 'range') {
                                        return <Grid item md={3} lg={3} m={1}>


                                            <TextField label={attribute.paymentAttributeName} priceAttributeID={attribute.paymentAttributeName} onChangeFn={addToPaymentAttributeList} />

                                        </Grid>
                                    } else {
                                        return <Grid item md={3} lg={3} m={1}>


                                            <DropDown label={attribute.paymentAttributeName} optionDisplayName={'keyName'} optionKeyName={'keyName'} optionsList={attribute.priceKeys} paymentAttributeID={attribute.paymentAttributeName} setSelectedValueFunction={addToPaymentAttributeList} />

                                        </Grid>
                                    }

                                })
                            }
                        </Grid>

                        <Grid container justifyContent={'center'} mt={5} mb={5}>
            <Grid item md={5} lg={5}>
                <SimpleButton buttonName='Calculate Service Cost' onClickActn={calculatePriceForService} param1={service._id} />
            </Grid>
            </Grid>  


                    </Grid>
                    
                })
            }


        </Grid>
    )
}

export default ServiceListingPage