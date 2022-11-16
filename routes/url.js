const router = require("express").Router();
const URL = require("../model/URL")

const {
    BASE_URL
} = require("../utils/constants");

const {
    generateUID,
    isUrlValid
} = require("../utils/helpers");


console.log(BASE_URL, "url")

/*
|--------------------------------------------------------------------------
|    //! CREATE
|--------------------------------------------------------------------------
|    //* @route  POST /api/url/short
|   //*  @desc   this route will create a short url
*/
router.post('/short', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (typeof originalUrl !== 'string') return res.status(401).json({ msg: "input URL must be of string" })
        if (!originalUrl) return res.status(401).json({ msg: "Enter the url it cannot be empty" })
        const isValid = isUrlValid(originalUrl);
        if (isValid) {
            if (!isUrlValid(BASE_URL)) return res.status(401).json({ msg: "Check the baseURL" });

            let url = await URL.findOne({ originslUrl: originalUrl });
            if (url) {
                res.status(200).json(url);
            } else {
                const urlCode = generateUID();
                const shortUrl = BASE_URL + "/" + urlCode;
                url = new URL({
                    originalUrl,
                    shortUrl,
                    urlCode
                });

                await url.save();
                res.status(200).json(url);
            }
        } else {
            return res.status(200).json({ msg: "Enter a Valid URL" });
        }
    }
    catch (e) {
        return res.status(400).json({ msg: e.message })
    }

})

module.exports = router;