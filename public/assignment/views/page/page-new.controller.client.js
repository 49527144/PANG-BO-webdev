(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.createPage = createPage;

        function createPage(page) {
            page.websiteId = vm.webId;

            var promise = PageService.createPage(page);
            promise
                .success(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");

                })
                .error(function () {
                })
        }
    }
})();