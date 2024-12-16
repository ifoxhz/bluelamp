const express = require('express');
const PermitService = require('../service/permit.service');
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

router.get('/get',validate, PermitService.get);
router.post('/create',validate, PermitService.create);
router.post('/delete',validate, PermitService.del);
router.post('/update',validate, PermitService.update);
router.get('/namelist',validate, PermitService.namelist);
// router.post('/logout', authController.logout);

module.exports = router;

