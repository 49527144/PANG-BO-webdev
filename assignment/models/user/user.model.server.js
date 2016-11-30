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
        deleteUser: deleteUser,
        getAllUser: getAllUser    
    }
    return api;


    function createrUser(user) {
        console.log("been here");
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
        return UserModel.update(
            { 
                _id:userId 
            },
            {
                firstname:user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone
            }
        );
    }


    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function getAllUser() {
        return UserModel.find();
    }
};