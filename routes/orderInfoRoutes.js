const express = require('express');
const router = express.Router();
const OrderInfoController = require('../controllers/OrderInfoController'); // Adjust path as needed

// Create a new order info entry
router.post('/create', OrderInfoController.createOrderInfo);

// Get all order info entries for a specific order
router.get('/', OrderInfoController.getAllOrderInfoByOrder);

// Get a specific order info entry by ID
router.get('/:id', OrderInfoController.getOrderInfoById);

// Update an order info entry by ID
router.put('/:id', OrderInfoController.updateOrderInfo);

// Delete an order info entry by ID
router.delete('/:id', OrderInfoController.deleteOrderInfo);

module.exports = router;
