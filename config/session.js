const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createSessionStore(){
    const MongoDbStore = mongoDbStore(expressSession);

    const store = new MongoDbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'double-depth',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig(){
    return {
        secret: 'Depth031!',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;