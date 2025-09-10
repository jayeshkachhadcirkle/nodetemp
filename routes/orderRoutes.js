const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController'); // Adjust path as needed

// Create a new order
router.post('/create', OrderController.createOrder);

// Get all orders by company ID
router.get('/', OrderController.getAllOrdersByCompany);

// Get a specific order by ID
router.get('/:id', OrderController.getOrderById);

// Update an order by ID
router.put('/:id', OrderController.updateOrder);

// Delete an order by ID
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
