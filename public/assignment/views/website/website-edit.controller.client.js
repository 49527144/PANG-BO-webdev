(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteById(websiteId);
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
                .success(function (allwebsites) {
                    if(allwebsites != '[]') {
                        vm.websites = allwebsites;
                    }
                })
                .error(function () {
                });
        }
        init();

        function updateWebsite() {

            if (!vm.website.name) {
                vm.error = ("Website name cannot be empty");
                return;
            }

            WebsiteService.updateWebsite(vm.website);
            $location.url("/user/"+ vm.userId +"/website");

        }

        function deleteWebsite(webId) {
            WebsiteService.deleteWebsite(webId);
            $location.url("/user/"+ vm.userId +"/website");

        }
    }
})();