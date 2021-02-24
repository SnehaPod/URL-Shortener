const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uri = "mongodb+srv://basecampuser:basecamp101@cluster0.skpjt.mongodb.net/globussoft-task";
const port = process.env.PORT || 8097;
var fetchLongURL = require("./api/controller").fetchLongURL;
var generateShortURL = require("./api/controller").generateShortURL;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true }, () => {
    console.log("Connected to DB");
})

// Route to fetch Long URL for given Short URL
app.post('/api/fetch-long-url', fetchLongURL);

// Route to generate Short URL for given Long URL
app.post('/api/generate-short-url', generateShortURL);

app.listen(port, () => {
    console.log("App listening on ", port);
})

module.exports = app;