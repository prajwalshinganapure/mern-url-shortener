//DataBase Connection
const mongoose = require('mongoose');

async function connectToMongoDB(url){
    return mongoose.connect(url);
}

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
.then(() => console.log("mongodb connected "))

module.exports = connectToMongoDB;