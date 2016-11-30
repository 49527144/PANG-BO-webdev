module.exports = function (app, model) {

    // var websites = [
    //     {_id: 321, name: 'facebook.com', uid: 123},
    //     {_id: 432, name: 'wikipedia.org', uid: 123},
    //     {_id: 543, name: 'twitter.com', uid: 234},
    //     {_id: 542, name: 'sina.com', uid: 234},
    //     {_id: 541, name: 'baidu.com', uid: 234}
    // ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model
            .websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(newWebsite){
                    res.json(newWebsite);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    if(websites){
                        res.json(websites);
                    } else {
                        res.send('0');
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    if(website) {
                        res.send(website);
                    } else {
                        res.send('0');
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                })
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }
}