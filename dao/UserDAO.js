var User = require("../models/User");



function create(user, successCallback, errorCallback) {
    new User(user).save(function (err) {
        if (err) return errorCallback();
        return successCallback();
    });

};

function find(userName, successCallback, errorCallback) {
    User.findOne({ username: userName }, function (err, result) {
        var user = result;
        if (err) return errorCallback();
        return successCallback(user);
    });
};


function updateStatusOnline(userId, online, successCallback, errorCallback) {
    User.update({ _id: userId }, { online: online }, function (err) {
        if (err) return errorCallback();

        return successCallback();
    });
};


function getConnectedUsers(connected, successCallback, errorCallback) {
    User.find({ online: connected }, function (err, result) {
        var usersConnected = result;
        if (err) return errorCallback();
        return successCallback(usersConnected);
    });
};


module.exports = {
    create: create,
    find: find,
    updateStatusOnline: updateStatusOnline,
    getConnectedUsers: getConnectedUsers
};