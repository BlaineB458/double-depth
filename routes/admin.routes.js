const express = require('express');

const adminController = require('../controller/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/admin-portfolio', adminController.getAdminPortfolio);

router.get('/admin/portfolio/new', adminController.getAddPortfolio);

router.get('/portfolio-gallery', adminController.getPortfolioGallery);

router.get('/project-delivery', adminController.getProjectDelivery);

router.post('/project-deliver', adminController.deliverProject);

router.post('/admin/portfolio', imageUploadMiddleware, adminController.createNewPortfolio);

router.get('/portfolio/:id', adminController.getUpdatePortfolio);

router.post('/portfolio/:id', imageUploadMiddleware, adminController.updatePortfolio);

router.delete('/portfolio/:id', adminController.deletePortfolio);

module.exports = router;