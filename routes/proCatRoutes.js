const express = require('express');
const router = express.Router();
const ProCatController = require('../controllers/proCatController'); // Adjust path as needed

router.post('/create', ProCatController.createProCat);
router.get('/', ProCatController.getAllProCats);
router.get('/:id', ProCatController.getProCatById);
router.put('/:id', ProCatController.updateProCat);
router.delete('/:id', ProCatController.deleteProCat);

module.exports = router;
