const express = require('express');
const PermitDevice = require('../service/permitdevice.service');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
// const authController = require('../../controllers/auth.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

const validate = (req, res, next) => {
    if (!req.session.userId) {
        return res.sendStatus(401)
    }
    next()
}

router.get('/get',validate, PermitDevice.get);
router.post('/create',validate, PermitDevice.create);
router.post('/delete',validate, PermitDevice.del);
// router.post('/logout', authController.logout);

module.exports = router;

