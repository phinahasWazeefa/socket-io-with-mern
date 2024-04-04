const express = require("express");

const {getService,getServicePrice} = require('../../controllers/user/userController')

const router = express.Router();


router.get('/get-service',getService);
router.get('/calculate-service-price',getServicePrice);






module.exports = router;