const {getServices,calculateServiceCost,createOrder} = require('../../services/userService');


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

exports.getServicePrice = async (req, res, next) => {
  try {
    req.body.serviceId = req.query.serviceId;
    req.body.paymentAttributes=req.query.paymentAttributes;
    const response = await calculateServiceCost(req.body);
    res.status(response.statusCode).send({serviceCost:response.serviceCost,message:response.message});
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};


exports.createOrder = async (req, res, next) => {
  try {
    const response = await createOrder(req.body);
    res.status(response.statusCode).send({order:response.order,message:response.message});
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};