(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
       	var vm = this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.webId);
            promise
                .success(function (temp) {
                    if(temp != '[]') {
                        vm.pages = temp;
                    }
                })
                .error(function () {
                });
        }
        init();        
    }
})();