const express = require('express');
const ProductService = require('../service/product.service');
const { refCount } = require('rxjs');
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


router.get('/get',validate, ProductService.get);
router.post('/create',validate, ProductService.create);
router.post('/delete',validate, ProductService.del);
router.post('/getRemainingPermit',validate, ProductService.getRemainingPermit);
// router.post('/logout', authController.logout);

module.exports = router;

