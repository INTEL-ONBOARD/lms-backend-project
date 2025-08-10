const Order = require('../models/Order');
const OrderStatus = require('../enums/orderStatus');
const PaymentStatus = require('../enums/paymentStatus');
const PaymentMethod = require('../enums/paymentMethods');
const mongoose = require('mongoose');

// // Middleware to validate order ID
// const validateOrderId = (req, res, next) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ status: 'error', message: 'Invalid order ID' });
//     }
//     next();
// };

// module.exports = validateOrderId;

// // Apply the middleware to routes that require order ID validation
// exports.validateOrderId = validateOrderId;


// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ status: 'success', message: 'Orders fetched successfully', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching orders' });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        newOrder.id = new mongoose.Types.ObjectId().toString(); // Generate a unique ID for the order
        newOrder.orderStatus = OrderStatus.PENDING;
        const savedOrder = await newOrder.save();
        res.status(201).json({ status: 'success', message: 'Order created successfully', data: savedOrder });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error creating order', error: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }
        res.status(200).json({ status: 'success', message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating order', error });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }
        res.status(200).json({ status: 'success', message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error deleting order', error });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }
        res.status(200).json({ status: 'success', message: 'Order retrieved successfully', data: order });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get orders by status
exports.getOrdersByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const orders = await Order.find({ orderStatus: status });
        res.status(200).json({ status: 'success', message: 'Orders retrieved successfully', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get orders by payment status
exports.getOrdersByPaymentStatus = async (req, res) => {
    try {
        const paymentStatus = req.params.paymentStatus;
        const orders = await Order.find({ paymentStatus: paymentStatus });
        res.status(200).json({ status: 'success', message: 'Orders retrieved successfully', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get orders by payment method
exports.getOrdersByPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = req.params.paymentMethod;
        const orders = await Order.find({ paymentMethod: paymentMethod });
        res.status(200).json({ status: 'success', message: 'Orders retrieved successfully', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get order by customer number
exports.getOrdersByCustomerNumber = async (req, res) => {
    try {
        const customerNumber = req.params.customerNumber;
        const orders = await Order.find({ customerNumber: customerNumber });
        res.status(200).json({ status: 'success', message: 'Orders retrieved successfully', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update order status by ID
exports.updateOrderStatusById = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        if (!Object.values(OrderStatus).includes(orderStatus)) {
            return res.status(400).json({ status: 'error', message: 'Invalid order status' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }
        res.status(200).json({ status: 'success', message: 'Order status updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating order status', error });
    }
};

// Update payment method by ID
exports.updatePaymentMethodById = async (req, res) => {
    try {
        const { paymentMethod } = req.body;
        if (!Object.values(PaymentMethod).includes(paymentMethod)) {
            return res.status(400).json({ status: 'error', message: 'Invalid payment method' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentMethod },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }
        res.status(200).json({ status: 'success', message: 'Payment method updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating payment method', error });
    }
};
