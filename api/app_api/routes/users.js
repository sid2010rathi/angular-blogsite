var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');
const favCtrl = require('../controllers/favourites');

/* GET users listing. */
router.post('/create', userCtrl.createUser);
router.put('/update/:userid', userCtrl.updateUser);
router.post('/login', userCtrl.login);
router.get('/:token', userCtrl.getUser)


router.post('/favourites', favCtrl.createFavourites);
router.get('/favourites/:userid', favCtrl.getFavourite);
router.delete('/favourites', favCtrl.removeFavourite);
module.exports = router;
