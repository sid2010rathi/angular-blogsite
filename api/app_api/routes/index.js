const express = require('express');   
const router = express.Router();

const ctrlBlog = require('../controllers/blog')

router.get('/blogs', ctrlBlog.getBlogs);
router.post('/blogs', ctrlBlog.createBlog);
router.get('/blogs/:blogid', ctrlBlog.getSingleBlog);
router.put('/blogs/:blogid', ctrlBlog.updateBlog);
router.delete('/blogs/:blogid', ctrlBlog.deleteBlog);

router.put('/blogs/:blogid/fav', ctrlBlog.updateFav);



router.post('/blogs/:blogid/comment', ctrlBlog.postComment)


module.exports = router;