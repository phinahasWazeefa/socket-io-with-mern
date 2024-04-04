const userServices = require('../services/userService');


exports.calculateTheServiceCost = async (serviceId,paymentAttributes)=>{
    try {
        console.log(serviceId,paymentAttributes);
        let reqObj = {
            serviceId: serviceId,
            paymentAttributes: paymentAttributes
        }
        const result = await userServices.calculateServiceCost({serviceId:serviceId, paymentAttributes:JSON.stringify(paymentAttributes)});
        return result;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.calculateTax = async(serviceId,serviceCost)=>{
    try {
        
        let taxAmount = 14;
        let taxedAddedServicePrice = taxAmount+serviceCost;
        return {taxAmount: taxAmount,taxedAddedServicePrice:taxedAddedServicePrice,statusCode:200}

    } catch (error) {
        console.log(error);

    }
}