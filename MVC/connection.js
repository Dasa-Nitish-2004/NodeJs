// which conntect the mongodb

var mongoose = require('mongoose');

// Connect to MongoDB

async function getConnection(url){
    // "mongodb://127.0.0.1:27017/Flight_info"
    return mongoose.connect(url)
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("Error connecting to MongoDB:", err);});
}

module.exports = {getConnection};