const express  = require('express');
const router   = express.Router();
const URL      = require("../model/URL");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
|--------------------------------------------------------------------------
|    //! FIND 
|--------------------------------------------------------------------------
|   //* @route  GET /:code
|  //*  @desc   this route will search code by the param and 
|  //*  redirect to short url
*/
router.get( '/:code', async ( req, res ) => {
  try {
    const urlCode = req.params.code;
    console.log(urlCode,"code")
    const url = await URL.findOne( { urlCode } );
    console.log(url)

    if ( url ) {
      return res.redirect(url.originalUrl)
    } else {
      return res.status(404).json({msg:"URL NOT FOUND"})
    }

  } catch ( e ) {
    return res.status(500).json({ msg: e.message })
  }
} )

module.exports = router;
