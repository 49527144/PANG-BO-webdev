(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.webId = $routeParams['wid'];
        vm.createPage = createPage;

        function createPage(page) {

            if(!page || !page.name) {
                vm.error = ("Page title cannot be empty");
                return;
            }


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