const db = require("../data/database");
const User = require("../models/user.model");
const Portfolio = require('../models/portfolio.model');
const authUtil = require("../util/authentication");

async function getAdminPortfolio(req,res, next){
    if(res.locals.isAdmin){
        try{
            const portfolios = await Portfolio.findAll();
            res.render('admin/admin-portfolio', { portfolios: portfolios});
        }catch(err){
            next(err);
            return;
        }
    }else{
        res.redirect('/home');
        return;

    }

}

function getAddPortfolio(req,res){
    if(res.locals.isAdmin){
        res.render('admin/add-portfolio');
        return;
    }

    res.redirect('portfolio');
}

function getPortfolioGallery(req, res){
    res.render('admin/portfolio-item');
}

function getProjectDelivery(req, res){
    res.render('admin/project-delivery');
}

async function deliverProject(req, res){
    const projectData = {
        projectTitle: req.body.projectTitle,
        clientEmail: req.body.clientEmail,
        googleDriveLink: req.body.googleDriveLink,
        date: new Date().toLocaleDateString('en-GB'),
    };

    console.log("Delivering project " + projectData.googleDriveLink + ' to ' + projectData.clientEmail);

    await db.getDb().collection('projects').insertOne(projectData);

    const project = await db.getDb().collection('projects').find({clientEmail: projectData.clientEmail}).toArray().then(function(error){
        console.log(error);
    });

    console.log(project[project.length - 1]);

    res.redirect('/project-delivery');

    

}

function createNewPortfolio(req, res){
    const portfolio = new Portfolio({
        companyName: req.body.companyName,
        serviceType: req.body.serviceType,
        images: req.files,
        description: req.body.description,

    });

console.log(portfolio.images);

    try{
        portfolio.save();
    }catch(err){
        next(error);
        return;
    }

    res.redirect('/admin-portfolio');
}

async function getUpdatePortfolio(req,res,next){
    try{
    const portfolio = await Portfolio.findById(req.params.id);
    res.render('admin/update-portfolio', {portfolio: portfolio});
    }catch(err){
        next(err);
    }
}

async function updatePortfolio(req, res, next){
    const portfolio = new Portfolio({
        companyName: req.body.companyName,
        serviceType: req.body.serviceType,
        description: req.body.description,
        _id: req.params.id,
    });
    

    if(req.files.length > 0){
            portfolio.replaceImages(req.files);
        }


    try{
        await portfolio.save();
        
    }catch(error){
        next(error);
        return;
    }

    res.redirect('/admin-portfolio');
}

async function deletePortfolio(req, res, next){
    let portfolio;
    try{
         portfolio = await Portfolio.findById(req.params.id);
         await portfolio.remove();

    }catch(err){
        return next(err);
    }
}

module.exports = {getAdminPortfolio: getAdminPortfolio,
getPortfolioGallery: getPortfolioGallery,
getAddPortfolio: getAddPortfolio,
getProjectDelivery: getProjectDelivery,
createNewPortfolio: createNewPortfolio,
getUpdatePortfolio: getUpdatePortfolio,
updatePortfolio: updatePortfolio,
deletePortfolio: deletePortfolio,
deliverProject: deliverProject,
};