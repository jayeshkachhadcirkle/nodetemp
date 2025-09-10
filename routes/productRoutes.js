const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController'); // Adjust path as needed

router.post('/create', ProductController.createProduct);
router.get('/', ProductController.getAllProductsByCategory);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
