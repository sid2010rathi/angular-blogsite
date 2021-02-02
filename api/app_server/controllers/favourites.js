const request = require("request");
var async = require('async');

const apiOptions = {
    server: 'http://localhost:3000'
}

const _renderListDisplay = function (req, res, responseBody) {
    res.render('favourite_list', {
        favourite_list: responseBody
    });
};

const favouritelistdisplay = function (req, res) {
    const path = '/api/blogs/favourites';
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

const getFavouriteInfo = function (req, res) {
    const path = `/api/blogs/${req.params.blogid}/favourites`;
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
    res.render('favourite_form', { title: 'Create Favourites', favourites: body });
};

const addNewFavourite = function (req, res) {
    const path = `/api/blogs/favourites`;
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

const doAddNewFavourite = function (req, res) {
    const path = `/api/blogs/favourites`;
    const postdata = {
        userid: req.body.userid,
        blogid: req.body.blogid
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
                res.redirect('/favourite_list');
            }
        }
    );
};

module.exports = {
    favouritelistdisplay,
    getFavouriteInfo,
    addNewFavourite,
    doAddNewFavourite
}
