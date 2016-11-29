(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId)
            promise
                .success(function (websites) {
                    if(websites != '[]') {
                        vm.websites = websites;
                    }
                })
                .error(function () {
                });
        }
        init();
    }
})();