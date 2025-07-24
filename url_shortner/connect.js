const mongoose = require('mongoose');
async function connectDB(url) {
    return mongoose.connect(url, {})
    // return con;
}

module.exports = {connectDB};