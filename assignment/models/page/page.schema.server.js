module.exports = function(){
    var mongoose = require("mongoose");
    var WidgetSchema = require("../widget/widget.schema.server.js")(mongoose);
    var PageSchema = mongoose.Schema(
    {
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name: String,
        title: String,
        description: String,
        widgets: [WidgetSchema]
    }, {collection: "page"});
    return PageSchema;
};