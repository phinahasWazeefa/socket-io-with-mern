const {createCategory,createSubCategory,createService,getServices,calculateServiceCost,getServicesForUser, createUser} = require('../../services/adminServices');

exports.createCategory = async (req, res, next) => {
    try {
      const response = await createUser(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.createSubCategory = async (req, res, next) => {
    try {
      const response = await createSubCategory(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.createService = async (req, res, next) => {
    try {
      console.log(req.body);
      const response = await createService(req.body);
      res.status(response.statusCode).send({message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getService = async (req, res, next) => {
    try {
      req.body.serviceId = req.query.serviceId;
      const response = await getServices(req.body);
      res.status(response.statusCode).send({service:response.services});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getServiceForUsers = async (req, res, next) => {
    try {
      req.body.serviceId = req.query.serviceId;
      const response = await getServicesForUser(req.body);
      res.status(response.statusCode).send({service:response.services});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };

  exports.getServicePrice = async (req, res, next) => {
    try {
      // req.body.serviceId = req.query.serviceId;
      // req.body.paymentAttributes=req.query.paymentAttributes;
      const response = await calculateServiceCost(req.body);
      res.status(response.statusCode).send({serviceCost:response.serviceCost,message:response.message});
    } catch (error) {
      const err = new Error(error.message);
      next(err);
    }
  };



