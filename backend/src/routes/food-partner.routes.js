const express = require('express');
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// GET /api/food-partner/:id - Get food items for the authenticated food partner
router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById);


module.exports = router;