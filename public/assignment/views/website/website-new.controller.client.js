(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        var webId = parseInt($routeParams['wid']);
        vm.createWebsite = createWebsite;


        function init() {
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
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

        function createWebsite(website) {
            website.uid = vm.userId;

            WebsiteService
                .createWebsite(website)
                .success(function (website) {
                    $location.url("/user/"+ vm.userId +"/website");

                })
                .error(function () {
                })
        }
    }
})();