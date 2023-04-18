const express = require('express');

const baseController = require('../controller/base.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/home');
});

router.get('/analytics', baseController.getAnalytics);

router.get('/home', baseController.getHome);

router.post('/signup', baseController.signup);
router.get('/signup', baseController.getSignup);

router.post('/login', baseController.login);
router.get('/login', baseController.getLogin);

router.get('/project-collection', baseController.getProjectCollection);

router.post('/logout', baseController.logout)

router.get('/services', baseController.getServices);

router.get('/portfolio', baseController.getPortfolio);

router.get('/about', baseController.getAbout);

router.get('/portfolio-detail/:id', imageUploadMiddleware, baseController.getPortfolioDetail);

//routes here
module.exports = router;