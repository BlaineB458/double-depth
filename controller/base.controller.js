const User = require("../models/user.model");
const Portfolio = require("../models/portfolio.model");
const authUtil = require("../util/authentication");
const db = require("../data/database");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");
const mongodb = require('mongodb');

function getHome(req, res) {
    let username = authUtil.getUsername(req);

  res.render("home", { username : username });
}

async function getPortfolio(req, res) {
    if(res.locals.isAdmin){
    res.redirect("/admin-portfolio");
    return;
    }else{
      
          try{
            const portfolios = await Portfolio.findAll();
            res.render('portfolio', {portfolios: portfolios});
          }catch(error){
            next(error);
            return;
          }
      

    }
}

function getServices(req, res) {
  res.render('services');
}

function getContact(req, res) {}

function getAbout(req, res) {
  res.render("about");
}

function getAnalytics(req, res){
  res.render("analytics");
}

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      username: "",
    };
  }
  res.render("signup", { inputData: sessionData });
}

async function signup(req, res) {
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };

  if(
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.username
    ) ||
    !validation.passwordIsConfirmed(req.body.password, req.body.confirmPassword)
  ){
    sessionFlash.flashDataToSession(
      req,
      {
        errorMsg:
          "Please check your input - password must be atleast 8 characters & passwords must match.",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
    }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.confirmPassword,
    req.body.username
  );

  try {
    const existsAlready = await user.existsAlready();

    if(existsAlready){
      sessionFlash.flashDataToSession(
        req,
        {
          errorMsg: "User exists already - try login instead!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        });
        return;
    }

    await user.signup();
    
} catch (error) {
    next(error);
    return;

}

console.log('Signup Successful!');
  res.redirect("/login");
}

async function getProjectCollection(req,res){
  const email = req.session.email;

  let username = authUtil.getUsername(req);

  const projects = await db.getDb().collection('projects').find({clientEmail:  email}).toArray();

 console.log(projects);


 res.render('project-collection', {username: username, projects: projects});
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("login", { inputData: sessionData});
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMsg: "No user was found - try signup instead!",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
    }
    );
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMsg: "Incorrect Password!",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/home");
  });
}

function logout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect("/home");
}

async function getPortfolioDetail(req, res){
     let portID;

  try{
    portID = mongodb.ObjectID(req.params.id);
  }catch(error){
    error.code = 404;
    throw error;
  }


  const fetchedPortfolio = await db.getDb().collection('portfolios').findOne({_id: portID});
  
  if(!fetchedPortfolio){
    const error = new Error("Oops! Looks like we don't have a portfolio with that ID - please try select another portfolio :)");
    error.code = 404;
    throw error;
  }
  
  res.render('portfolio-detail', {portfolio: new Portfolio(fetchedPortfolio)});
  
 
}

module.exports = {
  getHome: getHome,
  getSignup: getSignup,
  getAnalytics: getAnalytics,
  getProjectCollection: getProjectCollection,
  getPortfolioDetail: getPortfolioDetail,
  getLogin: getLogin,
  logout: logout,
  getServices: getServices,
  getPortfolio: getPortfolio,
  getAbout: getAbout,
  signup: signup,
  login: login,
};
