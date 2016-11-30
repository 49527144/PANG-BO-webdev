(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var webId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteById(webId);
            promise
                .success(function(temp) {
                    if(temp != '0') {
                        vm.website = temp;
                    }
                })
                .error(function () {
                });
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (allweb) {
                    if(allweb != '[]') {
                        vm.websites = allweb;
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