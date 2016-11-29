module.exports = function (app) {

    var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 543, "description": "Lorem" },
        { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
        { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" },
        { "_id": 322, "name": "Post 33", "websiteId": 543, "description": "Lorem" },
        { "_id": 433, "name": "Post 34", "websiteId": 543, "description": "Lorem" },
        { "_id": 541, "name": "Post 35", "websiteId": 543, "description": "Lorem" }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);


    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === parseInt(websiteId)) {
                result.push(pages[p]);
            }
        }
        res.send(result);
        return;
    }

    function findPageById(req,res) {
        var pageId = parseInt(req.params['pageId']);
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var updatedpage = req.body;
        var pageId = parseInt(req.params['pageId']);
        for(var p in pages) {
            if(pages[p]._id === pageId) { //was ==
                pages[p] = updatedpage;
            }
        }
        res.send(200);
    }

    function deletePage(req, res) {
        var pageId = parseInt(req.params['pageId']);
        for(var p in pages) {
            if(pages[p]._id === pageId) { //was ==
                pages.splice(p, 1);
            }
        }
        res.send(200);
    }

}