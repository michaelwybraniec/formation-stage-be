var User = require("../models/User");


function create(user, successCallback, errorCallback) {
    new User(user).save(function (err) {
        if (err) return errorCallback();
        return successCallback();
    });

};



module.exports = {
    create: create
};