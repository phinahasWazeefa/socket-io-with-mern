import React, { useState } from 'react'

import { useTheme } from '@mui/material/styles';




import { Grid, Stack } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';

import SimpleButton from '../ui-component/Buttons/SimpleButton';
import TextField from '../ui-component/Textfields/TextField';
import DropDown from '../ui-component/DropDown/DropDown';



import axios from '../axios';


function ServicePage() {

    const theme = useTheme();


    const [attributeCreationFormStatus, setattributeCreationFormStatus] = useState(false);
    const [serviceName, setserviceName] = useState('');
    const [paymentAttributeList, setpaymentAttributeList] = useState([]);






    const createServiceName = (value) => {
        setserviceName(value);
    }


    const createPaymentAttributeListFunction = () => {
        if (paymentAttributeList.length === 0) {
            setpaymentAttributeList(prev => [...prev, { id: 1, price: [] }]);
        } else {
            setpaymentAttributeList(prev => {
                const maxId = Math.max(...prev.map(item => item.id));
                return [...prev, { id: maxId + 1, price: [] }];
            });
        }
    };

    const deleteAPaymentAttributeEntry = (paymentAttributeID) => {
        const updatedArray = paymentAttributeList.filter(item => item.id !== paymentAttributeID);

        // Set the state with the updated array
        setpaymentAttributeList(updatedArray);
    }

    const createPaymentAttributeName = (value, priceAttributeId, paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListState => {
            const updatedPaymentAttributeList = prevPaymentAttributeListState.map(el => {
                if (el.id === paymentAttributeId) {
                    return { ...el, paymentAttributeName: value }; // Return the updated attribute with modified name
                }
                return el;
            });
            return updatedPaymentAttributeList;
        });
    };

    const createCalculationType = (value, paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListState => {
            const updatedPaymentAttributeList = prevPaymentAttributeListState.map(el => {
                if (el.id === paymentAttributeId) {
                    if (el.keyNameType == 'string' && value == 'range') {
                        window.alert("You cannot have key name type string for payment calculation type range");
                        return el;
                    }
                    return { ...el, calculationType: value };
                }
                return el;
            });
            return updatedPaymentAttributeList;
        });
    }

    const createKeyNameType = (value, paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListState => {
            const updatedPaymentAttributeList = prevPaymentAttributeListState.map(el => {
                if (el.id === paymentAttributeId) {
                    if (el.calculationType == 'range' && value == 'string') {
                        window.alert("You cannot have key name type string for payment calculation type range");
                        return el;
                    }
                    return { ...el, keyNameType: value };
                }
                return el;
            });
            return updatedPaymentAttributeList;
        });
    }



    const createPriceAttributeListFunction = (paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListEl => {
            return prevPaymentAttributeListEl.map(el => {
                if (el.id === paymentAttributeId) {
                    let updatedPrice;
                    if (el.price.length === 0) {
                        updatedPrice = [{ id: 1 }];
                    } else {
                        const maxId = Math.max(...el.price.map(item => item.id));
                        console.log(maxId);
                        updatedPrice = [...el.price, { id: maxId + 1 }];
                    }
                    return { ...el, price: updatedPrice };
                }
                return el;
            });
        });
    };



    const addPriceKeyToPriceAttributeList = (value, attributeId, paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListState => {
            const updatedPaymentAttributeList = prevPaymentAttributeListState.map(el => {
                if (el.id === paymentAttributeId) {
                    const updatedPrice = Array.isArray(el.price)
                        ? el.price.map(attribute => {
                            if (attribute.id === attributeId) {
                                return { ...attribute, keyName: value };
                            }
                            return attribute;
                        })
                        : [{ id: attributeId, keyName: value }]; // if price is not an array, initialize it
                    return { ...el, price: updatedPrice };
                }
                return el;
            });
            return updatedPaymentAttributeList;
        });
    };





    const addPriceValueToPriceAttributeList = (value, attributeId, paymentAttributeId) => {
        setpaymentAttributeList(prevPaymentAttributeListState => {
            const updatedPaymentAttributeList = prevPaymentAttributeListState.map(el => {
                if (el.id === paymentAttributeId) {
                    const updatedPrice = Array.isArray(el.price)
                        ? el.price.map(attribute => {
                            if (attribute.id === attributeId) {
                                return { ...attribute, value: value };
                            }
                            return attribute;
                        })
                        : [{ id: attributeId, keyName: value }]; // if price is not an array, initialize it
                    return { ...el, price: updatedPrice };
                }
                return el;
            });
            return updatedPaymentAttributeList;
        });
    };



    const createServiceFunction = () => {
        const postData = {
            categoryId: "65f1700b8f450d35232b1503",
            serviceName: serviceName,
            rates: paymentAttributeList
        }


        axios.post('/admin/create-service', postData).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response);
        });
    }


    const sortIntegerTypePriceChart = (paymentAttributeID) => {
        let priceArray = paymentAttributeList.find((el) => el.id === paymentAttributeID);
        if (priceArray.keyNameType && priceArray.keyNameType == 'integer') {

            let sortedPrice = (priceArray.price).sort((a, b) => {
                if (parseInt(a.keyName) < parseInt(b.keyName)) {
                    return -1;
                }
                if (parseInt(a.keyName) > parseInt(b.keyName)) {
                    return 1;
                }
                return 0;
            });

            // Update the paymentAttributeList with the sorted price array
            setpaymentAttributeList((prev) => {
                return prev.map((el) => {
                    if (el.id === paymentAttributeID) {

                        console.log(el)
                        return { ...el, price: sortedPrice };
                    }
                    return el;
                });
            });

            return;

        }
        window.alert("Key type may not be defined or type is not integer");
        return;


        //console.log(sortedPrice);
    };


    return (
        <Grid container>


            <Grid container>
                <Grid item lg={4}>
                    <TextField label='Service Name' onChangeFn={createServiceName} />
                </Grid>
                <Grid container justifyContent={'space-between'} width={'100%'} mt={2} >
                    <Grid item md={2} lg={4}>
                        <h3 onClick={() => { console.log(paymentAttributeList) }}>Payment Attribute</h3>
                    </Grid>
                    <Grid item md={5} lg={3}>
                        <SimpleButton buttonName='Create Payment Attribute' onClickActn={createPaymentAttributeListFunction} />
                    </Grid>
                </Grid>
            </Grid>
            {
                paymentAttributeList.map((paymentAttribute) => {
                    return <Grid container sx={{ bgcolor: '#F8FAE5', borderRadius: '12px', border: '', padding: '10px' }} mt={2}>
                        <Grid container justifyContent={'flex-end'}>


                            <Grid item md={1} lg={1} sx={{ bgcolor: '' }} >
                                <Grid container justifyContent={'space-around'} bgcolor={''} >
                                    <SortIcon onClick={() => sortIntegerTypePriceChart(paymentAttribute.id)} sx={{color:theme.palette.primary.main}} />
                                    <CloseIcon onClick={() => deleteAPaymentAttributeEntry(paymentAttribute.id)}   sx={{color:theme.palette.orange.main}}  />
                                </Grid>
                            </Grid>


                        </Grid>

                        <Grid item md={5} m={1.5} >
                            <TextField label='Payment Attribute Name' displayValue={paymentAttribute.paymentAttributeName} paymentAttributeID={paymentAttribute.id} priceAttributeID={null} onChangeFn={createPaymentAttributeName} />
                        </Grid>
                        <Grid item md={3} m={1.5}>
                            <DropDown label='Price calcuation type' defaultValue={paymentAttribute.calculationType} optionsList={[{ name: 'range' }, { name: 'single' }]} optionKeyName={'name'} optionDisplayName={'name'} setSelectedValueFunction={createCalculationType} paymentAttributeID={paymentAttribute.id} />
                        </Grid>
                        <Grid item md={3} m={1.5}>
                            <DropDown label='Key Name type' defaultValue={paymentAttribute.keyNameType} optionsList={[{ name: 'integer' }, { name: 'string' }]} optionKeyName={'name'} optionDisplayName={'name'} setSelectedValueFunction={createKeyNameType} paymentAttributeID={paymentAttribute.id} />
                        </Grid>
                        <Grid container justifyContent={'space-between'} width={'100%'} mt={2} >
                            <Grid item md={4}>
                                <h3>Price Chart</h3>
                            </Grid>
                            {
                                (paymentAttribute.paymentAttributeName || paymentAttribute.paymentAttributeNamem != null) && (paymentAttribute.keyNameType) && (paymentAttribute.calculationType) ? <Grid item md={2}>
                                    <SimpleButton buttonName='Create Price' onClickActn={() => createPriceAttributeListFunction(paymentAttribute.id)} />
                                </Grid> : null
                            }

                        </Grid>
                        <Grid container>
                            {
                                (paymentAttribute.price).map(el => {

                                    return <Grid item md={5} m={1}>

                                        <Grid container>
                                            <Grid item md={6}> <TextField label='Price Key Name' displayValue={el.keyName || ''} onChangeFn={addPriceKeyToPriceAttributeList} priceAttributeID={el.id} paymentAttributeID={paymentAttribute.id} /> </Grid>
                                            <Grid item md={6}> <TextField label='Price Value' displayValue={el.value || 0} onChangeFn={addPriceValueToPriceAttributeList} priceAttributeID={el.id} paymentAttributeID={paymentAttribute.id} />  </Grid>
                                        </Grid>

                                    </Grid>

                                })

                            }
                        </Grid>
                    </Grid>

                })
            }

            {paymentAttributeList.length > 0 ? <Grid container justifyContent={'center'} mt={5} mb={5}>
                <Grid item md={2} lg={2}>
                    <SimpleButton buttonName='Create Service' onClickActn={createServiceFunction} />
                </Grid>
            </Grid> : null}



        </Grid>
    )
}

export default ServicePage