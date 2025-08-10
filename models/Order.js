const mongoose = require('mongoose');
const OrderStatus = require('../enums/orderStatus');
const PaymentMethod = require('../enums/paymentMethods');
const PaymentStatus = require('../enums/paymentStatus');

const OrderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    orderStatus: {
        type: String,
        required: true,
        enum: OrderStatus,
        default: OrderStatus.PENDING
    },
    orderTotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: PaymentMethod,
        default: PaymentMethod.CASH
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerNumber: {
        type: String,
        required: true,
        trim: true
    },
    customerAddress: {
        type: String,
        trim: true,
        default: ''
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    handOverDate: {
        type: Date,
        default: null
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
