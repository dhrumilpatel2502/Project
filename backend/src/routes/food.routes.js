const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

// POST /api/food/ [protected] - Add new food item
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood);

//GET /api/food/ - Get all food items (this can be expanded later)
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems);

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood);


router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood);

module.exports = router;