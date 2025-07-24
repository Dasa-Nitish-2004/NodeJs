const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true ,unique: true },
  shortUrl: { type: String, required: true ,unique: true},
  visitedHistory: [{ timestamp : { type: Date, default: Date.now }, ip: String }],
},{ timestamps: true  });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
