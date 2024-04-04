const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../configurations/constants');

const {isAdminVerification} = require('../services/adminServices');
const {isUserVerification} = require('../services/userService');


exports.isAdmin = async (req, res, next) => {
    try {
      const authHeader = req.get("Authorization");
      if (!authHeader) {
        const error = new Error("Not authenticated");
        error.status = 400;
        next(error);
      }
      decodedToken = jwt.verify(authHeader,SECRET_KEY);
      const response = await isAdminVerification(decodedToken);
      if (response.statusCode != 200) {
        const error = new Error(response.message);
        error.status = 400;
        next(error);
      } else {
        req.body.userId = decodedToken._id;
        next();
      }
    } catch (error) {
      console.log(error);
      const err = new Error(error.message);
      next(err);
    }
  };


  exports.isUser = async (req, res, next) => {
    try {
      const authHeader = req.get("Authorization");
      if (!authHeader) {
        const error = new Error("Not authenticated");
        error.status = 400;
        next(error);
      }
      decodedToken = jwt.verify(authHeader,SECRET_KEY);
      const response = await isUserVerification(decodedToken);
      if (response.statusCode != 200) {
        const error = new Error(response.message);
        error.status = 400;
        next(error);
      } else {
        req.body.userId = decodedToken._id;
        next();
      }
    } catch (error) {
      console.log(error);
      const err = new Error(error.message);
      next(err);
    }
  };
