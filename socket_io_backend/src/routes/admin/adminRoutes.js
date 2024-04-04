const express = require("express");

const {createCategory,createSubCategory,createService,getService,getServicePrice,getServiceForUsers} = require('../../controllers/admin/adminController')

const router = express.Router();

router.post('/create-category',createCategory);
router.post('/create-sub-category',createSubCategory);
router.post('/create-service',createService);
router.get('/get-service',getService);
router.get('/user-get-service',getServiceForUsers);
router.post('/calculate-service-price',getServicePrice);






module.exports = router;