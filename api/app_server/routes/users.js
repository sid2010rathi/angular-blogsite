var express = require('express');
var router = express.Router();
const userCtrl = require('../../app_api/controllers/users');
const ctrlFav = require('../controllers/favourites');

/* GET users listing. */
router.post('/create', userCtrl.createUser);
router.put('/update/:userid', userCtrl.createUser);
router.post('/login', userCtrl.login);



//favourites
router.get('/favourite_list', ctrlFav.favouritelistdisplay);
router.route('/blogs/favourites')
    .get(ctrlFav.addNewFavourite)
    .post(ctrlFav.doAddNewFavourite);
module.exports = router;
