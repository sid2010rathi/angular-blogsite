const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

var sendsJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

const getBlogs = function(req, res) {
    Blog.find({})
    .exec((err, results) => {
        if(err){
            sendsJSONresponse(res, 404, err);
            return;
        }
        sendsJSONresponse(res, 200, results);
    }) 
}

const createBlog = function(req, res) {
    Blog.create({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        images : req.body.images.toString().split(",")

    }, (err, data) => {
        if(err){
            sendsJSONresponse(res, 400, err);
        } else {
            sendsJSONresponse(res, 201, data);
        }
    })
}
const postComment = function(req,res) {

    console.log("Comment", req.body);
    const blogid = req.params.blogid;

    if (blogid) {
        Blog
          .findById(blogid)
          .exec((err, blog ) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
             
                postCommentByid(req,res,blog, req.body.comment);

            }
          }
        );
      } else {
        res
          .status(404)
          .json({
            "message": "Not found, Blogid required"
          });
      }

};
const postCommentByid = function(req,res, blog, newComment){

    if(!blog){

    res
      .status(404)
      .json({
        "message": "blogid not found"
      });
 
    }else{
        blog.comments.push({
            description: newComment            
          });

          console.log(blog);
          blog.save((err, blog) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
             
               res
                 .status(201)
                 .json(blog);
            }

    });
    }
};

const getSingleBlog = function(req, res) {
    Blog.findById(req.params.blogid).exec((err, data) => {
        if(err){
            sendsJSONresponse(res, 404, err);
            return;
        }
        sendsJSONresponse(res, 200, data);
    }) 
}

const updateBlog = function(req, res) {
    if(!req.params.blogid) {
        sendsJSONresponse(res, 404, {"message": "Not found, blogid is required!"});
        return;
    }
    Blog.findById(req.params.blogid).exec((err, data) => {
        if(!data){
            sendsJSONresponse(res, 404, {"message" : "blogid not found"});
            return;
        } else if(err) {
            sendsJSONresponse(res, 400, err);
            return;
        }

        data.name = req.body.name;
        data.description = req.body.description;
        data.author = req.body.author;
        data.images = req.body.images.toString().split(',');
        
        data.save((err, data) => {
            if(err) {
                sendsJSONresponse(res, 404, err);
            } else {
                sendsJSONresponse(res, 200, data);
            }
        })
    }) 
}

const updateFav = function(req, res) {
    if(!req.params.blogid) {
        sendsJSONresponse(res, 404, {"message": "Not found, blogid is required!"});
        return;
    }
    Blog.findById(req.params.blogid).exec((err, data) => {
        if(!data){
            sendsJSONresponse(res, 404, {"message" : "blogid not found"});
            return;
        } else if(err) {
            sendsJSONresponse(res, 400, err);
            return;
        }

        // data.name = req.body.name;
        // data.description = req.body.description;
        // data.author = req.body.author;
        // data.images = req.body.images.split(",");
        if(data.favourites){

            data.favourites = false;

        }
        else{

            data.favourites = true;
        }
       // data.favourites = Boolean(req.body.favourites === 'false' ? false : true);

        console.log(data.favourites);
        data.save((err, data) => {
            if(err) {
                sendsJSONresponse(res, 404, err);
            } else {
                sendsJSONresponse(res, 200, data);
            }
        })
    }) 
}

const deleteBlog = function(req, res) {
    const blogid = req.params.blogid;
    if(blogid) {
        Blog.findByIdAndRemove(blogid)
            .exec((err, data) => {
                if(err){
                    sendsJSONresponse(res, 404, err);
                    return;
                }
                sendsJSONresponse(res, 204, null);
            })
    } else {
        sendsJSONresponse(res, 404, {"message": "No blogid"});
    }
}

module.exports ={
    getBlogs,
    createBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    updateFav,
    postComment,
    postCommentByid

}
