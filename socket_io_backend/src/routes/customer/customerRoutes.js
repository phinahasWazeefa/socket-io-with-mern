const express = require("express");

const {getService,getServicePrice,createOrder} = require('../../controllers/user/userController')

const router = express.Router();



router.post('/create-order',createOrder);






module.exports = router;