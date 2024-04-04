const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const {SECRET_KEY} = require('../configurations/constants')

exports.signUp = async({email,password,name,role})=>{
    try {

        const userFromDb = await User.findOne({email:email,role:role ? role:'customer'});
        if(userFromDb) return {statusCode:409,message:"User with email already exists"}

        const userObj = new User({
            email: email,
            password: password,
            name: name,
            role:role
        });

        await userObj.save();
        return {statusCode:200,message:"User created successfully"}

        
    } catch (error) {
        console.log(error);
        throw error;

    }
};


exports.signIn = async ({email,password})=>{
    try {
        
        const userFromDb = await User.findOne({email: email});
        if(!userFromDb) return {statusCode:409, message:"User not found"}
        if(userFromDb.password != password) return {statusCode:409, message:"Password mismatch"}
        const generatedToken = jsonwebtoken.sign({_id:userFromDb._id,email:userFromDb.email},SECRET_KEY,{expiresIn:'7d'});
        return {
            statusCode:200,
            user:{
                name:userFromDb.name,
                email:userFromDb.email,
                role:userFromDb.role,
                token:generatedToken
            }
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}