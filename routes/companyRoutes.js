// routes/companyMasters.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController');
const { verifyToken } = require('../controllers/usersController');
const authenticate = require('../authenticate');

// Routes
router.post('/', authenticate, companyController.createCompany);
router.get('/', authenticate, companyController.getAllCompanies);
router.get('/:id', authenticate, companyController.getCompanyById);
router.put('/:id', authenticate, companyController.updateCompany);
router.delete('/:id', authenticate, companyController.deleteCompany);

router.get('/byuser/:id', authenticate, companyController.getCompanyByUser);

module.exports = router;
