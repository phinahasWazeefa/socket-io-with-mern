const express = require("express");

const authController = require('../../controllers/auth/auth')

const router = express.Router();

router.post('/sign-in',authController.signIn);
router.post('/sign-up',authController.signUp);

module.exports = router;