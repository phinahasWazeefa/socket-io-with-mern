




exports.attributeCalculator = (priceChart, attribute) => {
    try {
        
        // parameters recivng are rate array which is i format 👇👇👇
        //  [
        //     {
        //         id:1,
        //         price:[
        //             {
        //                 id:1,
        //                 keyName:"Male",
        //                 value:100
        //             },
        //             {
        //                 id:2,
        //                 keyName:"Female",
        //                 value:100
        //             }
        //         ],
        //         paymentAttributeName:'Sex',
        //         calculationType:'range',
        //     }
        // ]
  
        // second parametr 👇👇
        // {
        //     "paymentAttributeName":"Age",
        //      "value":"2"
        // },

        //This function find the object with the payment attribute name from the priceChart array 
        // check it's payment calculation type is range or single
        //if single pass the price attribute array and the key to search in it and get the value corresponding to the key
        // if range , extract the keyname into an array and pass that array and the key to search in that arra and it return only the keyName



        const priceObj= priceChart.find(el => el.paymentAttributeName  == attribute.paymentAttributeName);

        
        if (priceObj.calculationType == 'single') {
            return {status:200,price:singleTYPEcalculator(priceObj.price, attribute.value)}
        } else if (priceObj.calculationType == 'range') {
            const keysArray = (priceObj.price).map(item => parseInt(item.keyName));
            let keyForPrice = rangeTYPEcalculator(keysArray, attribute.value);
            if(keyForPrice.val == -1) return {status:409,message:"key value out of range"}
            return {status:200,price:singleTYPEcalculator(priceObj.price, keyForPrice.val)}
        }else{
            return {status:409,message:"Invalid attribute type"}
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}


const rangeTYPEcalculator = (priceChart, key) => {
    try {

         // parameters recivng are rate array which is i format 👇👇👇
        
        //         price:[
        //           1,5,3
        //         ],
  
        // second parametr 👇👇
        //      a number 1

        //This function find the key passing in the array if not found return the one greatest next to it in the array (keyname is returned)

        for (let i = 0; i < priceChart.length - 1; i++) {
            if (key >= priceChart[i] && key <= priceChart[i + 1]) {
                if (key == priceChart[i]) {
                    return { status: "same", val: priceChart[i] }
                }
                return { status: "greater", val: priceChart[i + 1] }
            }
        }
        return { status:null, val:-1 }; // Input is outside the range of the array


    } catch (error) {
        console.log(error);
        throw error;
    }
}

const singleTYPEcalculator = (priceChart, key) => {
    try {

         // parameters recivng are rate array which is i format 👇👇👇
        
        //         price:[
        //             {
        //                 id:1,
        //                 keyName:"Male",
        //                 value:100
        //             },
        //             {
        //                 id:2,
        //                 keyName:"Female",
        //                 value:100
        //             }
        //         ],
  
        // second parametr 👇👇
        //      a number or a string like 'femal'/1

        //This function find the array object with the keyName matching with the second parameter and return the value
    

        
        const price = priceChart.find((el)=>el.keyName == key)
        console.log(price)
        return price.value;

    } catch (error) {
        console.log(error);
        throw error;
    }
}