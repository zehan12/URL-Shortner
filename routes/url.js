const router        = require("express").Router();
const urlController = require("../controller/urlController")


/*
|--------------------------------------------------------------------------
|    //! SHOW 
|--------------------------------------------------------------------------
|    //* @route  GET /api/url/short
|   //*  @desc   this route will show created short url from DB
*/
router.get("/show", urlController.showAll )


/*
|--------------------------------------------------------------------------
|    //! CREATE
|--------------------------------------------------------------------------
|    //* @route  POST /api/url/short
|   //*  @desc   this route will create a short url
*/
router.post('/short', urlController.createShortUrl );

/*
|--------------------------------------------------------------------------
|    //! DELETE
|--------------------------------------------------------------------------
|    //* @route  DELETE /api/url/short
|   //*  @desc   this route will delete url from DB
*/
router.delete('/short/:code', urlController.deleteUrl );


router.get('/short/:code', urlController.clickIncrement );

module.exports = router;