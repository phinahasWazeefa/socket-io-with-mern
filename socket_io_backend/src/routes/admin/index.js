const routes = require("express").Router();

const adminRoute = require('./adminRoutes');
const middleware = require('../../middlewares/tokenVerification')



routes.use("/", adminRoute);



module.exports = routes;

