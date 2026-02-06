const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//api creatiopn for user registration (user auth apis)
router.post('/user/register', authController.registerUser) //api
router.post('/user/login', authController.loginUser) //api
router.get('/user/logout', authController.logoutUser) //api

//api creatiopn for food partner registration (food partner auth apis)
router.post('/food-partner/register', authController.registerFoodPartner) //api
router.post('/food-partner/login', authController.loginFoodPartner) //api
router.get('/food-partner/logout', authController.logoutFoodPartner) //api


module.exports = router;