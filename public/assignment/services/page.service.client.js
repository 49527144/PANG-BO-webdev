(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": 321, "name": "Post 1", "websiteId": 543, "description": "Lorem" },
            { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
            { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" },
            { "_id": 322, "name": "Post 33", "websiteId": 543, "description": "Lorem" },
            { "_id": 433, "name": "Post 34", "websiteId": 543, "description": "Lorem" },
            { "_id": 541, "name": "Post 35", "websiteId": 543, "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(page) {
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p,1);
                }
            }
        }
    }
})();