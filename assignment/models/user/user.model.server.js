module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createrUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        findUserByFacebookId: findUserByFacebookId,
        deleteUser: deleteUser
    }
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function createrUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function updateUser(userId, user) {
        // console.log("final step");
        return UserModel.update(
            { 
                _id:userId 
            },
            {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone
            }
        );
    }


    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};