const mongoose = require('mongoose');
const foodPartnerModel = require('./foodPartner.model');

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: false
    },
    description:{
        type: String,
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
    },
    likeCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.model('Food', foodSchema);

module.exports = foodModel;