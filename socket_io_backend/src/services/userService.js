const ObjectId = require("mongoose").Types.ObjectId;

const User = require('../models/User');
const Service = require('../models/Service');
const Order  = require('../models/Order');

const { calculateTheServiceCost, calculateTax } = require('../utils/priceCalculators');
const priceCalculator = require('../utils/paymentAttributeCalculator');



exports.isUserVerification = async ({ _id }) => {
    try {
        const userFromDb = await User.findOne({ _id: _id, role:'customer' });
        if (!userFromDb) return { statusCode: 401, message: "No user found" };
        return { statusCode: 200 };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServices = async ({ serviceId=null }) => {
    try {
       let conditionQRY = {
        $match:{
            isActive:false,
        }
       }

       serviceId ? conditionQRY['$match']['_id']=new ObjectId(serviceId):null; 

        const serviceFromDb = await Service.aggregate([

            conditionQRY,
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData",
                },
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategoryData",
                },
            },
            {
                $unwind: "$categoryData",
            },
            {
                $unwind: "$subCategoryData",
            },
            {
                $project: {
                    category: {
                        _id: '$categoryData._id',
                        name: '$categoryData.name',
                        description: '$categoryData.description',
                        tags: '$categoryData.tags',
                      },
                }
            }


        ])



        return { statusCode: 200, services: serviceFromDb }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.calculateServiceCost = async ({ serviceId, paymentAttributes }) => {
    try {

        

        let parsedPaymentAttributes = JSON.parse(paymentAttributes)
        const serviceFromDb = await Service.findById(serviceId);
        //console.log(serviceFromDb.rates);
        let serviceTotalPrice = 0;
        for(let i = 0; i < serviceFromDb.rates.length; i++){
            let paymentAttributeObj = serviceFromDb.rates[i];
            let paymentAttributeObjFromReqst = parsedPaymentAttributes.find(obj => obj.paymentAttribute === paymentAttributeObj.paymentAttribute);
            //console.log(paymentAttributeObjFromReqst);
           let result =  priceCalculator[paymentAttributeObj.paymentAttribute](paymentAttributeObjFromReqst.val,paymentAttributeObj);
      
           if(result.statusCode != 200) return {statusCode: result.statusCode,message: result.message}
           serviceTotalPrice = serviceTotalPrice+result.price;
        }
        return {statusCode:200,serviceCost:serviceTotalPrice}

        




    } catch (error) {
        console.log(error);
        throw error;
    }
}


exports.createOrder = async({userId,serviceId,paymentAttributes,scheduledDate, orderedDate})=>{
    try {
        
        const result =  await calculateTheServiceCost(serviceId,paymentAttributes);
       
        if(result.statusCode != 200) return {statusCode:result.statusCode,message:result.message}
        let taxResult = await calculateTax(serviceId,result.serviceCost);
        if(taxResult.statusCode != 200) return {statusCode:result.statusCode,message:result.message}
       
        let rateSplitUp = {
            taxAmount:taxResult.taxAmount,
            serviceCost:result.serviceCost,
            totalAmountToPay:taxResult.taxedAddedServicePrice

        }
        const orderObj = new Order({
            user:userId,
            otp:'123',
            scheduledDate:scheduledDate,
            service:serviceId,
            paymentAttributes:paymentAttributes,
            rateSplitUp:rateSplitUp,
            orderedDate:orderedDate
        });

        let resultAfterDbEntry = await orderObj.save();

        return {statusCode:200,message:"Order created successfully", order:resultAfterDbEntry}

    } catch (error) {
        console.log(error);
        throw error;
    }
}



