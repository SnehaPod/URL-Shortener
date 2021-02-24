const mongoose = require("mongoose");

var shortUrlSchema = new mongoose.Schema({
    originalUrl: { type: String },
    urlCode: { type: String },
    shortUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
})

var shortUrlModel = mongoose.model('ShortURL', shortUrlSchema);

module.exports = {
    shortUrlModel
}