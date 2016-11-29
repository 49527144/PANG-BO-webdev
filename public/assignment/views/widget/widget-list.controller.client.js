(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm  = this;
        vm.userId  = parseInt($routeParams['uid']);
        vm.webId  = parseInt($routeParams['wid']);
        vm.pageId  = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .then(function (response) {
                    vm.widgets = response.data;
                });
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            console.log(url);
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function sortWidget(start, end) {
            WidgetService
                .sortWidget(vm.pageId, start, end)
                .then(function (response) {
                    vm.widgets = response.data;
                }, function(error) {
                    vm.error = error.data;
                })

        }
    }
})();