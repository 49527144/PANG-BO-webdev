(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.webId);
        }

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = vm.webId;
            PageService.createPage(page);
            vm.pages= PageService.findPageByWebsiteId(vm.webId);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
        }

        init(); 

    }
})();