var User = require("../models/User");



function create(user, successCallback, errorCallback) {
    new User(user).save(function (err) {
        if (err) return errorCallback();
        return successCallback();
    });

};

function find(userName, successCallback, errorCallback) {
    User.findOne({ username: userName }, function (err, result){
        var user = result;
        if (err) return errorCallback();
        return successCallback(user);
    });
};







module.exports = {
    create: create,
    find: find
};