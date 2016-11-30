module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget:createWidget,
        findWidgetById:findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        updateOrder:updateOrder,
        reorderWidget: reorderWidget,
        uploadImage: uploadImage,
        selectFlicker: selectFlicker
    };
    return api;

    function createWidget(pageId, widget){
        widget["_page"] = pageId;
        widget["isType"] = false;
        return WidgetModel.create(widget);
    }

    function findWidgetById(widgetId){
        return WidgetModel
            .findById(widgetId);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel
            .find({
                _page: pageId
            })
            .sort({
                priority: 1
            });
    }

    function updateWidget(widgetId, widget){
        switch(widget.widgetType) {
            case "HEADER": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                );
                break;

            case "IMAGE": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }
                );
                break;

            case "YOUTUBE": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }
                );
                break;

            case "TEXT": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }
                );
                break;

            case "HTML": return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        text: widget.text
                    }
                );
                break;

            default:
                break;
        }
    }

    function deleteWidget(widgetId){
        return WidgetModel
            .remove({
                _id: widgetId
            })
    }

    function reorderWidget(pageId, start, end){
        start = parseInt(start);
        end = parseInt(end);
        return WidgetModel
            .find({
                    _page: pageId
                },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(start > end){
                            if(widget.priority >= end && widget.priority < start){
                                widget.priority++;
                                widget.save(function(){});
                            } else if(widget.priority === start) {
                                widget.priority = end;
                                widget.save(function(){});
                            }
                        } else {
                            if(widget.priority === start){
                                widget.priority = end;
                                widget.save(function(){});
                            } else if(widget.priority > start  && widget.priority <= end) {
                                widget.priority--;
                                widget.save(function(){});
                            }
                        }
                    });
                });
    };

    function updateOrder(pageId, priority){
        return WidgetModel
            .find({
                    _page: pageId
                },
                function(error, widgets){
                    widgets.forEach(function(widget){
                        if(widget.priority > priority){
                            widget.priority--;
                            widget.save(function(){});
                        }
                    });
                });
    }

    function selectFlicker(widgetId, photo){
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    url: photo
                }
            );
    }

    function uploadImage(widgetId, filename) {
        return WidgetModel
                .update(
                    {
                        _id: widgetId
                    },
                    {
                        url: '/../../uploads/' + filename
                    }
                );
        }

}