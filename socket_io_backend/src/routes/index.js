const routes = require('express').Router();

const authRoutes = require('../routes/auth/index');
const adminRoutes = require('../routes/admin/index');
const customerRoutes = require('../routes/customer/index');


const middleware = require('../middlewares/middlewares')

routes.use('/api/auth',authRoutes);
routes.use('/api/admin',adminRoutes);
routes.use('/api/customer',customerRoutes);



module.exports = routes;