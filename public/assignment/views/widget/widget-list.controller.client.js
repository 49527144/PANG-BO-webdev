(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeListController", WidgeListController);

    function WidgeListController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function (widgetList) {
                    vm.widgets = widgetList;
                })
            $(".wam-widgets").sortable({ axis: 'y' });
        };
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();