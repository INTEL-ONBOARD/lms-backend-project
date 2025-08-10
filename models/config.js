const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        trim: true
    },
    packageDescription: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    packagePrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    packageFeatures: {
        type: [String],
        required: true,
        default: []
    },
    packageWeight: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    packageChargePerKg: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    packageDeliveryTime: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
