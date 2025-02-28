const express = require('express');
const { getCakes, getCake, addCake, removeCake } = require('../controllers/cakeControllers');
const { validateCakeMiddleware } = require('../middlewares/validator');

const router = express.Router();

// Routes
router.get('/cakes', getCakes);
router.get('/cakes/:id', getCake);
router.post('/cakes', validateCakeMiddleware, addCake);
router.delete('/cakes/:id', removeCake);

module.exports = router;
