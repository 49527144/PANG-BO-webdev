(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
       	var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.webId);
            promise
                .success(function (pages) {
                    if(pages != '[]') {
                        vm.pages = pages;
                    }
                })
                .error(function () {
                });
        }
        init();        
    }
})();