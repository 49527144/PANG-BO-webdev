module.exports = function() {

    var localConnection = 'mongodb://localhost/bopang';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require('mongoose');
    mongoose.connect(localConnection);


    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    return model;
};