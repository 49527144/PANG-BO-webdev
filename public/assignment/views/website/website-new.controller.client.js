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
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(webId);
        }
        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.uid = vm.userId;
            WebsiteService.createWebsite(website);
            vm.websites= WebsiteService.findWebsitesForUser(vm.userId);
            $location.url("/user/"+ vm.userId +"/website");
        }
    }
})();