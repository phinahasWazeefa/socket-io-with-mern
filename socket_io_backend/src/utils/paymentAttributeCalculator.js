exports.byPerson =  (noOfPerson, rateObj) => {
    try {

        
        let priceOfPerson = rateObj.price["1pax"];
        if(!priceOfPerson) return {statusCode:409,message:"Rate slab mismatch"}
        let total = priceOfPerson * noOfPerson;
    
        return {statusCode:200,price:total}



    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.byTime =  (totalHours, rateObj) => {
    try {

        
        const extractedValues = Object.keys(rateObj.price)
            .filter(key => key.endsWith('hour'))
            .map(key => parseInt(key.replace('hour', '')));
            const hourVal = findRange(extractedValues, totalHours);
            if(!hourVal) return {statusCode:409,message:"The hour you provided is not a valid value"}

            let concatedRateSlab = hourVal+"hour";

            let priceForTheHour = rateObj.price[concatedRateSlab];
            if(!priceForTheHour) return {statusCode:409,message:"Invalid price slab"};
         
            return {statusCode:200,price:priceForTheHour}


    } catch (error) {
        console.log(error);
        throw error;
    }
}


const findRange = (arr,input)=>{
    try {

        for (let i = 0; i < arr.length - 1; i++) {
            if (input >= arr[i] && input <= arr[i + 1]) {
                if(input == arr[i]){
                    return arr[i]
                }
                return arr[i+1]
            }
        }
        return null;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}