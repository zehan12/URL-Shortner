const express         = require('express');
const router          = express.Router();
const URL             = require("../model/URL");
const indexController = require("../controller/indexController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
|--------------------------------------------------------------------------
|    //! REDIRECT
|--------------------------------------------------------------------------
|   //* @route  GET /:code
|  //*  @desc   this route will search code by the param and 
|  //*  redirect to short url
*/
router.get( '/:code', indexController.redirectToOriginalURL );

module.exports = router;
