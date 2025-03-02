const express = require('express');
const { getCakes, getCake, addCake, removeCake, updateCake } = require('../controllers/cakeControllers');
const { validateCakeMiddleware } = require('../middlewares/validator');

const router = express.Router();

router.get('/cakes', getCakes);
router.get('/cakes/:id', getCake);
router.post('/cakes', validateCakeMiddleware, addCake);
router.delete('/cakes/:id', removeCake);
router.put('/cakes/:id', updateCake);

module.exports = router;
