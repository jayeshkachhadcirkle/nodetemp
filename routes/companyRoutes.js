// routes/companyMasters.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController');
const { verifyToken } = require('../controllers/usersController');

// Routes
router.post('/', verifyToken, companyController.createCompany);
router.get('/', verifyToken, companyController.getAllCompanies);
router.get('/:id', verifyToken, companyController.getCompanyById);
router.put('/:id', verifyToken, companyController.updateCompany);
router.delete('/:id', verifyToken, companyController.deleteCompany);

router.get('/byuser/:id', verifyToken, companyController.getCompanyByUser);

module.exports = router;
