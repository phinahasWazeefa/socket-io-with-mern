const {signIn,signUp} = require('../../services/authServices')

exports.signIn = async (req,res,next)=>{
    try {

        const response = await signIn(req.body);
        res.status(response.statusCode).send({message:response.message,user:response.user})
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
        next(err);
    }
}

exports.signUp = async (req,res,next)=>{
    try {

        const response = await signUp(req.body);
        res.status(response.statusCode).send({message:response.message})
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
        next(err);
    }
}