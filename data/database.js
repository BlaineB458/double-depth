const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbURL = 'mongodb://localhost:27017';

if(process.env.MONGODB_URL){
    mongodbURL = process.env.MONGODB_URL;
}

let database;

async function connectToDatabase(){
    const client = await MongoClient.connect(mongodbURL);
    database = client.db('double-depth');
}

function getDb(){
    if(!database){
        throw new Error('You must connect to database first!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}