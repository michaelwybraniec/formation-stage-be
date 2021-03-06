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
        console.log(article);
        return successCallback(article);
    });
};

function updateContent(articleId, content, successCallback, errorCallback) {
        Article.update({ _id: articleId }, { content: content }, function (err) {
            if (err) return errorCallback();
            return successCallback();
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



function updateLikersIds(articleId, likerIds, successCallback, errorCallback) {
    Article.update({ _id: articleId }, { likersIds: likerIds }, function (err) {
        if (err) return errorCallback();
        return successCallback();
    });
};


function updatePoopsIds(articleId, poopsIds, successCallback, errorCallback) {
    Article.update({ _id: articleId }, { poopsIds: poopsIds }, function (err) {
        if (err) return errorCallback();
        return successCallback();
    });
};


function deleteById(articleId, ownerId, successCallback, errorCallback) {

    Article.remove({ _id: articleId, ownerId: ownerId  }, function (err) {
        if (err) return errorCallback();
        return successCallback();

    });
};


module.exports = {
    getAll: getAll,
    getByUserId: getByUserId,
    save: save,
    getOneById: getOneById,
    updateLikersIds: updateLikersIds,
    updatePoopsIds: updatePoopsIds,
    deleteById: deleteById,
    updateContent: updateContent,
};