const mongoose = require('mongoose');
const Favourite = mongoose.model('Favourites');
const Blog = mongoose.model('Blog');

var sendsJSONresponse = function (res, status, content) {
    res.status(status).json(content);
}

const createFavourites = function (req, res) {
    Favourite.create({
        userid: req.body.userid,
        blogid: req.body.blogid

    }, (err, data) => {
        if (err) {
            sendsJSONresponse(res, 400, err);
        } else {
            sendsJSONresponse(res, 201, data);
        }
    })
}

const getFavourite = function (req, res) {
    Favourite.find({ userid: req.params.userid }).lean().then((data, err) => {
        if (err) {
            sendsJSONresponse(res, 404, err);
            return;
        }

        if (data) {
            getBlogs(data).then(d => {
                sendsJSONresponse(res, 200, d)
            });
        }
    })
}

const getBlogs = (data) => {
    return new Promise((resolve, reject) => {
        var blogids = [];
        data.forEach(function (element) {
            console.log(element.blogid)
            blogids.push(element.blogid)
        });

        Blog.find({ _id: { $in: blogids } }).lean().then((d, e) => {
            if (e) {
                reject(e);
                return;
            }
            resolve(d);
        })
    })
}

const removeFavourite = function (req, res) {
    Favourite.find({ userid: req.params.userid, blogid: req.params.blogid }).lean().then((data, err) => {

        if (err) {
            sendsJSONresponse(res, 404, err);
            return;
        }

        if (data) {
            Favourite.remove(data)
                .exec((err, data) => {
                    if (err) {
                        sendsJSONresponse(res, 404, err);
                        return;
                    }
                    sendsJSONresponse(res, 204, null);
                })
        }
    })
}


module.exports = {
    createFavourites,
    getFavourite,
    removeFavourite
}