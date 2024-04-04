const ObjectId = require("mongoose").Types.ObjectId;

const User = require('../models/User');
const Category = require('../models/PetCategory');
const subCategory = require('../models/SubCategory');
const Service = require('../models/Service');
const { trimTheWord, standardizeWord } = require('../utils/commonFunctions');
const priceCalculator = require('../utils/PetPaymentAttributeCalculator');


exports.createUser = async ({ name, email }) => {
    try {

        

        const categoryFromDb = await User.findOne({ email: email });
        if (categoryFromDb) return { statusCode: 409, message: "User already exists" }
        const categoryObj = new User({
            name:name,
           email:email,
        });

        await categoryObj.save();

        return { statusCode: 200, message: "User created successfully" }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.updateUserSocket = async(socket,userEmail)=>{
    try {

        console.log(userEmail);
        let res =  await User.updateOne({email:userEmail},{$set:{socketObj:socket}});
        console.log(res);
        return {status:200}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.geteUserSocket = async(userEmail)=>{
    try {

        console.log(userEmail);
        let res =  await User.findOne({email:userEmail});
        console.log(res);
        return {socketId:res.socketObj}
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.isAdminVerification = async ({ _id }) => {
    try {
        const userFromDb = await User.findOne({ _id: _id, role: 'admin' });
        if (!userFromDb) return { statusCode: 401, message: "No user found" };
        return { statusCode: 200 };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createCategory = async ({ categoryName, types, attributes, paymentAttributes }) => {
    try {

        let editedCategoryName = standardizeWord(trimTheWord(categoryName));

        const categoryFromDb = await Category.findOne({ name: editedCategoryName });
        if (categoryFromDb) return { statusCode: 409, message: "Category already exists" }
        const categoryObj = new Category({
            name: editedCategoryName,
            types: types,
            attributes: attributes,
            paymentAttributes: paymentAttributes
        });

        await categoryObj.save();

        return { statusCode: 200, message: "Category created successfully" }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createSubCategory = async ({ categoryId, subcategoryName, description, tags }) => {
    try {

        let editedSubCategoryName = standardizeWord(trimTheWord(subcategoryName));

        const subcategoryFromDb = await subCategory.findOne({ name: editedSubCategoryName });
        if (subcategoryFromDb) return { statusCode: 409, message: "Category already exists" }
        const subcategoryObj = new subCategory({
            name: editedSubCategoryName,
            category: categoryId,
            description: description,
            tags: tags
        });

        await subcategoryObj.save();

        return { statusCode: 200, message: "Sub-Category created successfully" }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.createService = async ({ categoryId, subCategoryId, serviceName, description, type, paymentAttributesCount, paymentAttributes, cancellationPolicy, rates }) => {
    try {

        let editedServiceName = standardizeWord(trimTheWord(serviceName));
        const serviceFromDb = await Service.findOne({ name: editedServiceName });
        if (serviceFromDb) return { statusCode: 409, message: "Service with name already exist" }
        const serviceObj = new Service({
            category: categoryId,
            name: editedServiceName,
            type: type,
            rates: rates,
        });

        await serviceObj.save();

        return { statusCode: 200, message: "Service created successfully" }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.calculateServiceCost = async ({ serviceId, paymentAttributes }) => {
    try {

        const serviceFromDb = await Service.findById(serviceId,{rates:1});
        // 👆👆 getting service rate array of the matching service id.
        if(!serviceFromDb) return { statusCode: 409,message:"Service not found."}

        let totalServiceCost = 0;
        
        for(let i=0;i<paymentAttributes.length;i++){

            let response = priceCalculator.attributeCalculator(serviceFromDb.rates,paymentAttributes[i]);
            if(response.status != 200 ) return { statusCode: 409,message:response.message }
            totalServiceCost = parseInt(response.price) + totalServiceCost;

        }

        return { statusCode: 200, serviceCost: totalServiceCost }


    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServices = async ({ serviceId = null }) => {
    try {

    

        const servicesFromDB = await Service.aggregate([
            {
                $lookup: {
                    from: 'petcategories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: '$categoryData'
            },
            {
                $addFields: {
                    paymentAttributes: '$categoryData.paymentAttributes'
                }
            },
            {
             $addFields:{
                rates:{
                    $map: {
                        input: '$rates',
                        as: 'rate',
                        in: {
                            _id:'$$rate._id',
                            paymentAttributeID: '$$rate.paymentAttribute',
                            priceChart:'$$rate.price',
                            min:'$$rate.min',
                            max:'$$rate.max',
                            attributeDetails:{
                                $first:{
                                    $filter:{
                                        input:'$paymentAttributes',
                                        as:'attr',
                                        cond:{
                                            eq:['$$attr._id','$paymentAttributeID']
                                        }
                                    }
                                }
                            }, 
                        }
                    }
                }
             }
            },
            {
                $project: {
                    name:1,
                    rates: {
                        $map:{
                           
                            input:'$rates',
                            as:'rate',
                            in:{
                                _id:'$$rate._id',
                               attributeID:'$$rate.paymentAttributeID',
                               attributeName:'$$rate.attributeDetails.name',
                               priceChart:'$$rate.priceChart',
                               min:'$$rate.min',
                               max:'$$rate.max'
                            }
                        }
                    }
                }
                
            },
            
        ]);
        




        return { statusCode: 200, services: servicesFromDB }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getServicesForUser = async ({})=> {
    try {

    

        const servicesFromDB = await Service.aggregate([
            {
                $project: {
                    name: 1,
                    paymentAttributes: {
                        $map: {
                            input: '$rates',
                            as: 'rate',
                            in: {
                                paymentAttributeName: '$$rate.paymentAttributeName',
                                calculationType: '$$rate.calculationType',
                                priceKeys: {
                                    $map: {
                                        input: '$$rate.price',
                                        as: 'priceObj',
                                        in: {
                                            keyName: '$$priceObj.keyName'
                                        }
                                    }
                                },

                            }
                        }
                    },
                    paymentAttributesArray:{
                        $map:{
                            input:'$rates',
                            in:'$$this.paymentAttributeName'
                        }
                    }
                }
            }
        ]);
        
        




        return { statusCode: 200, services: servicesFromDB }

    } catch (error) {
        console.log(error);
        throw error;
    }
}