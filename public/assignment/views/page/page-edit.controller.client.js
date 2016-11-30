(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;


        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.findPageById = findPageById;
        vm.updatePage = updatePage;
        vm.deletePage =deletePage;

        function init() {
            var promise = PageService.findPageById(vm.pageId);
            promise
                .success(function (temp) {
                    if(temp != '0') {
                        vm.page = temp;
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