const URL = require("../model/URL");
const {
    BASE_URL
} = require("../utils/constants");

const {
    generateUID,
    isUrlValid
} = require("../utils/helpers");


module.exports = {

    showAll:  async (req, res) => {
        try {
            const url = await URL.find();
            return res.status(200).json(url)
        } catch (e) {
            return res.status(500).json({ msg: e.message })
        }
    },
 
    createShortUrl: async (req, res) => {
        try {
            // destructure url from body
            const { originalUrl } = req.body;
            // check type of url is not string throw error
            if (typeof originalUrl !== 'string') return res.status(401).json({ msg: "input URL must be of string" })
            // check if  url is not present
            if (!originalUrl) return res.status(401).json({ msg: "Enter the url it cannot be empty" })
            // check the url is valid or not
            const isValid = isUrlValid(originalUrl);
            if (isValid) {
                // check if base url is not valid throw error
                if (!isUrlValid(BASE_URL)) return res.status(401).json({ msg: "Check the baseURL" });
                // check url is present in DB or not
                let url = await URL.findOne({ originalUrl });
                if (url) {
                    res.status(200).json(url);
                } else {
                    // generate a uniqiue id
                    const urlCode = generateUID();
                    // create a short url 
                    const shortUrl = BASE_URL + "/" + urlCode;
                    // create instance of url
                    url = new URL({ originalUrl, shortUrl, urlCode });
                    // save in db
                    await url.save();
                    res.status(200).json(url);
                }
            } else {
                return res.status(401).json({ msg: "Enter a Valid URL" });
            }
        }
        catch (e) {
            return res.status(500).json({ msg: e.message })
        }
    },

    deleteUrl: async (req, res) => {
        try {
            const urlCode = req.params.code;
            console.log(urlCode)
            const url = await URL.findOneAndDelete({
                urlCode
            });
    
            if (url) {
                return res.status(200).json({ msg: "url deleted successfully", url })
            } else {
                return res.status(401).json({ msg: "url not deleted" })
            }
        } catch (e) {
            return res.status(500).json({ msg: e.message })
        }
    
    }

}