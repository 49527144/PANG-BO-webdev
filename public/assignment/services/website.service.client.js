(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(website) {
            var newwebsite = {
                name:website.name,
                uid:website.uid
            }
            return $http.post('/api/user/' + newwebsite.uid + '/website', newwebsite);
        }

        function findWebsiteById(wid) {
            return $http.get('/api/website/' + wid);
        }

        function findAllWebsitesForUser(uid) {
            return $http.get('/api/user/' + uid + '/website');
        }

        function updateWebsite(website){
            $http.put("/api/website/" + website._id, website);
        }

        function deleteWebsite(websiteId){
            $http.delete("/api/website/" + websiteId);
        }
    }
})();