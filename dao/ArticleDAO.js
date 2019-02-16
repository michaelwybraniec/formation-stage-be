var Article = require("../models/Article");
var mongoose = require('mongoose');

function getAll(successCallback, errorCallback) {
    Article.aggregate([
        { $lookup: { from: "users", localField: "ownerId", foreignField: "_id", as: "articleOwner" } },
        { $unwind: "$articleOwner" }
    ], function (err, results) {
        if (err) return errorCallback();
        return successCallback(results);
    });
};



function getOneById(articleId, successCallback, errorCallback) {
    Article.findOne({ _id: articleId }, function (err, result) {
        var article = result;
        if (err) return errorCallback();
        return successCallback(article);
    });
};



function getByUserId(userId, successCallback, errorCallback) {

    Article.aggregate([
        { $lookup: { from: "users", localField: "ownerId", foreignField: "_id", as: "articleOwner" } },
        { $unwind: "$articleOwner" },
        { $match: { "articleOwner._id": new mongoose.Types.ObjectId(userId) } }
    ], function (err, results) {
        if (err) return errorCallback();
        return successCallback(results);
    });
};



function save(article, userId, successCallback, errorCallback) {

    // Fetch FE data and add a few important fields
    article.ownerId = userId;
    article.datePosted = Date.now();

    //  Save in Mongo
    new Article(article).save(function (err) {
        if (err) return errorCallback();
        return successCallback();
    });

};






module.exports = {
    getAll: getAll,
    getByUserId: getByUserId,
    save: save,
    getOneById: getOneById
};