(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;


        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.findPageById = findPageById;
        vm.updatePage = updatePage;
        vm.deletePage =deletePage;

        function init() {
            var promise = PageService.findPageById(vm.pageId);
            promise
                .success(function (page) {
                    if(page != '0') {
                        vm.page = page;
                    }
                })
                .error(function () {
                });
        }
        init();

        function findPageById(pageId) {
            PageService.findPageById(pageId);
        }

        function updatePage(page) {
            PageService.updatePage(page);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
        }
    }
})();