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
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);

        }
        init();


        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/"+ vm.userId +"/website");

        }

        function deleteWebsite(webId) {
            WebsiteService.deleteWebsite(webId);
            $location.url("/user/"+ vm.userId +"/website");

        }
    }
})();