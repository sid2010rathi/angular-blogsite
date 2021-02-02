var express = require('express');
var router = express.Router();
const ctrlFav = require('../controllers/favourites');


//favourites
router.get('/favourite_list', ctrlFav.favouritelistdisplay);
router.route('/favourites')
    .get(ctrlFav.addNewFavourite)
    .post(ctrlFav.doAddNewFavourite);
module.exports = router;