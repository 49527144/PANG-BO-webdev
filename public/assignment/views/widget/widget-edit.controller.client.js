(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $sce, $location) {
        var vm = this;
        
        vm.userId  = parseInt($routeParams['uid']);
        vm.webId  = parseInt($routeParams['wid']);
        vm.pageId  = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


        function updateWidget(widget) {
            widget = vm.widget;
            var updated = WidgetService.updateWidget(widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

        function deleteWidget(widgetId) {
            widgetId = vm.widget._id;
            WidgetService.deleteWidget(widgetId);
            alert("This page has been successfuly deleted")
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }
    }
})();