const request = require("request");
var async = require('async');

const apiOptions = {
    server: 'http://localhost:3000'
}

const _renderListDisplay = function (req, res, responseBody) {
    res.render('blog_list', {
        blog_list: responseBody
    });
};

const listdisplay = function (req, res) {
    const path = '/api/blogs';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderListDisplay(req, res, body);
        }
    );
};

const _renderDetailPage = function (req, res, responseBody) {
    res.render('display', {
        currentBook: responseBody
    });
};

const getBlogInfo = function (req, res) {
    const path = `/api/blogs/${req.params.blogid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};

const _renderCreatePage = function (req, res, body) {
    res.render('blog_form', { title: 'Create Blog', blogs: body });
};

const addNewBlog = function (req, res) {
    const path = `/api/blogs`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderCreatePage(req, res, body);
        }
    );
}

const doAddNewBlog = function (req, res) {
    const path = `/api/blogs`;
    const postdata = {
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    }
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 201 || response.statusCode === 200) {
                res.redirect('/blog_list');
            }
        }
    );
};

module.exports = {
    listdisplay,
    getBlogInfo,
    addNewBlog,
    doAddNewBlog
}
