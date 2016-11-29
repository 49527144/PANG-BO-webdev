(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: 321, name: 'facebook.com', uid: 123},
            {_id: 432, name: 'wikipedia.org', uid: 123},
            {_id: 543, name: 'twitter.com', uid: 234},
            {_id: 542, name: 'sina.com', uid: 234},
            {_id: 541, name: 'baidu.com', uid: 234}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(website) {
            websites.push(website);
        }

        function findWebsiteById(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function findWebsitesForUser(uid) {
            var result = [];
            for(var w in websites) {
                if(websites[w].uid === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function updateWebsite(websiteId, website){
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(websiteId){
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w,1);
                }
            }
        }
    }
})();