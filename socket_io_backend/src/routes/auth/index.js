const routes = require("express").Router();

const authRoute = require('./auth');




routes.use("/", authRoute);



module.exports = routes;

