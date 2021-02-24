const validUrl = require('valid-url');
const shortid = require("shortid");
var shortUrlModel = require("../models/shortUrl").shortUrlModel;

process.env.SHORT_BASEURL = 'bit.ly'

async function fetchLongURL(req, res) {
    var urlCode = req.body.shortUrl.split('/')[1];
    const item = await shortUrlModel.findOne({ urlCode: urlCode });
    if (item) {
        return res.redirect(item.originalUrl);
    } else {
        return res.redirect(constants.errorUrl);
    }
}

async function generateShortURL(req, res) {
    var originalUrl = req.body.originalUrl;
    const queryOptions = { originalUrl };
    if (validUrl.isUri(originalUrl)) {
        let urlData;
        try {
            urlData = await shortUrlModel.findOne(queryOptions).exec();
            if (urlData) {
                res.status(200).json(urlData);
            } else {
                const urlCode = shortid.generate();
                shortUrl = process.env.SHORT_BASEURL + '/' + urlCode;

                var payload = {
                    originalUrl: originalUrl,
                    urlCode: urlCode,
                    shortUrl: shortUrl,
                    createdAt: Date.now()
                }

                const item = new shortUrlModel(payload);
                await item.save();

                res.status(200).json(payload);
            }
        }
        catch (err) {
            console.log('err', err)
            return res.status(401).json('Error generating Short URL');
        }
    } else {
        return res.status(401).json('Invalid Original URL');
    }
}

module.exports = {
    fetchLongURL,
    generateShortURL
}