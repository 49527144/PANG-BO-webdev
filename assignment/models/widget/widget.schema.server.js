module.exports = function(){
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        widgetType: String,
        text: String,
        description: String,
        placeholder: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        priority: Number
    }, {collection: "widget"});
    return WidgetSchema;
};