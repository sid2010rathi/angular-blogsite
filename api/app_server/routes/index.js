const express = require('express');   
const router = express.Router();

const ctrlMain = require('../controllers/main');

const ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/blog_list', ctrlBlog.listdisplay);
router.route('/blogs/new')
    .get(ctrlBlog.addNewBlog)
    .post(ctrlBlog.doAddNewBlog);

module.exports = router;
