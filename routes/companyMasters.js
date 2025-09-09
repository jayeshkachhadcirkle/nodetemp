// routes/companyMasters.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyMastersController');

// Routes
router.post('/', companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
