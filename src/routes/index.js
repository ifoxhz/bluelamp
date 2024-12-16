const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const permitRoute = require('./permit.route');
const permitDeviceRoute = require('./permitdevice.route');
const credentRoute = require('./credent.route')
const occkpRoute = require('./occkp.route')


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/permit',
    route: permitRoute,
  },
  {
    path: '/permitdevice',
    route: permitDeviceRoute,
  },
  {
    path: '/credent',
    route: credentRoute,
  },
  {
    path: '/occ/kp',
    route: occkpRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
