const path = require('path');

const express = require('express');
const expressSession = require('express-session');
const csrf = require('csurf');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthMiddleware = require('./middlewares/check-auth');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

let port = 3000;

if( process.env.PORT){
    port = process.env.PORT
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/portfolios/assets', express.static('portfolio-data'));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthMiddleware);

app.use(baseRoutes);
app.use(adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function(){
    app.listen(port);

}).catch(function(error){
    console.log('Failed to connect to the database!');
    console.log(error);

});