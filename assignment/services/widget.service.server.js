module.exports = function (app, model) {

    // var widgets = [
    //     { "_id": 123, "widgetType": "HEADER", "pageId": 321, "size": 2, "text": "GIZMODO"},
    //     { "_id": 234, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
    //     { "_id": 345, "widgetType": "IMAGE", "pageId": 321, "width": "100%",
    //      "url": "http://lorempixel.com/400/200/"},
    //     { "_id": 456, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"},
    //     { "_id": 567, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
    //     { "_id": 678, "widgetType": "YOUTUBE", "pageId": 321, "width": "100%",
    //        "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": 789, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"}
    // ];


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads'});

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/:widgetId/flickr', selectFlickr);

    function uploadImage(req, res) {
            var userId = req.body.userId;
            var websiteId = req.body.websiteId;
            var pageId = req.body.pageId;
            var widgetId = req.body.widgetId;
            var width = req.body.width;
            var myFile = req.file;

            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            model
                .widgetModel
                .uploadImage(widgetId, filename)
                .then(
                    function(image){
                        if(image) {
                            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                        }
                    },
                    function(error){
                        res.sendStatus(400).send(error);
                    }
                );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    if(widgets){
                        widget["priority"] = parseInt(widgets.length + 1);
                        model
                            .widgetModel
                            .createWidget(pageId, widget)
                            .then(
                                function(newWidget){
                                    res.send(newWidget);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    if(widget){
                        res.send(widget);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    if(widgets){
                        res.json(widgets);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    if(widget){
                        model
                            .widgetModel
                            .updateOrder(widget._page, widget.priority)
                            .then(
                                function(){
                                    model
                                        .widgetModel
                                        .deleteWidget(widgetId)
                                        .then(
                                            function(status){
                                                res.sendStatus(200);
                                            },
                                            function(error){
                                                res.sendStatus(400).send(error);
                                            }
                                        );
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function selectFlickr(req, res){
        var widgetId = req.params.widgetId;
        var content = req.body;
        model
            .widgetModel
            .selectFlicker(widgetId, content.photo)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

}