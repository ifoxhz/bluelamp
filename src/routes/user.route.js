const express = require('express');
const userService = require('../service/user.service');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');

const router = express.Router();

const validate = (req, res, next) => {
  console.log("user ")
  if (!req.session.userId) {
    console.log("user 401")
      return res.sendStatus(401)
  }
  next()
}

router.post('/create',validate, userService.create);
router.post('/updatepawd',validate, userService.updatepawd);

// router
//   .route('/')
//   .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
