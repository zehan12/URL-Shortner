const URL = require("../model/URL");

module.exports = {
    redirectToOriginalURL:  async ( req, res ) => {
        try {
          const urlCode = req.params.code;
          console.log(urlCode,"code")
          const url = await URL.findOne( { urlCode } );      
          if ( url ) {
            url.click++
            await url.save();
            return res.redirect(url.originalUrl)
          } else {
            return res.status(404).json({msg:"URL NOT FOUND"})
          }
      
        } catch ( e ) {
          return res.status(500).json({ msg: e.message })
        }
      }
}