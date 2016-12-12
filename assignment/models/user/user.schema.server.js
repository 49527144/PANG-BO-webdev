module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        websites: [WebsiteSchema],
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "user"});
    return UserSchema;
}