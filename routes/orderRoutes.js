const router = require('express').Router();
const OrderController = require('../controllers/orderController');

// Basic CRUD
router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.patch('/:id/status', OrderController.updateOrderStatusById);
router.patch('/:id/payment-method', OrderController.updatePaymentMethodById);

module.exports = router;
