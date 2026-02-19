const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const LikeModel = require('../models/likes.model');
const { v4: uuid } = require('uuid');
const saveModel = require('../models/save.model');


async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });


    res.status(201).json({
        message: 'Food item created successfully',
        food: foodItem
    });

}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user

    const isAlreadyLiked = await LikeModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadyLiked) {
        await LikeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            message: 'Food item unliked successfully',
        });
    }

    const like = await LikeModel.create({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });
    res.status(201).json({
        message: 'Food item liked successfully',
        like
    });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        });

        return res.status(200).json({
            message: 'Food item unsaved successfully',
        });
    }
    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    });

    res.status(201).json({
        message: 'Food item saved successfully',
        save
    });
}

async function getSaveFood(req, res) {
    const user = req.user;
    const savedFoods = await saveModel.find({ user: user._id }).populate('food');
    if (!savedFoods || savedFoods.length === 0) {
        return res.status(200).json({
            message: 'No saved foods found',
        });
    }
    res.status(200).json({
        message: 'Saved foods fetched successfully',
        savedFoods
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood,
}