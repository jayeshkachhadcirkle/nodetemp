const express = require('express');
const router = express.Router();
const VariantController = require('../controllers/VariantController'); // Adjust path as needed

router.post('/create', VariantController.createVariant);
router.get('/', VariantController.getAllVariantsByProduct);
router.get('/:id', VariantController.getVariantById);
router.put('/:id', VariantController.updateVariant);
router.delete('/:id', VariantController.deleteVariant);

module.exports = router;
