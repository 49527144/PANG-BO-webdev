(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteById(websiteId);
            promise
                .success(function (website) {
                    if(website != '0') {
                        vm.website = website;
                    }
                })
                .error(function () {
                });

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    if(websites != '[]') {
                        vm.websites = websites;
                    }
                })
                .error(function () {
                });
        }
        init();


        function updateWebsite() {
            WebsiteService.updateWebsite(vm.website);
            $location.url("/user/"+ vm.userId +"/website");

        }

        function deleteWebsite(webId) {
            WebsiteService.deleteWebsite(webId);
            $location.url("/user/"+ vm.userId +"/website");

        }
    }
})();