(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(page) {
            var newpage = {name:page.name, websiteId:page.websiteId}
            return $http.post('/api/website/' + page.websiteId + '/page', newpage)
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get('/api/website/' + websiteId + '/page');
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function updatePage(page) {
            $http.put("/api/page/" + page._id, page);
        }

        function deletePage(pageId) {
            $http.delete("/api/page/" + pageId);
        }
    }
})();