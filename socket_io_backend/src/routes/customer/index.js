const routes = require("express").Router();

const customerRoute = require('./customerRoutes');
const noAuthCustomersRoute = require('./customerNoAuthRoutes');

const {isUser} = require("../../middlewares/tokenVerification");




routes.use("/general",noAuthCustomersRoute)
routes.use("/",isUser, customerRoute);



module.exports = routes;

