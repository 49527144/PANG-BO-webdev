(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService,$location) {
        var vm = this;
        
        vm.userId  = parseInt($routeParams['uid']);
        vm.webId  = parseInt($routeParams['wid']);
        vm.pageId  = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);
        vm.createWidget = createWidget;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function createWidget(pid, widget) {
            if(widget.widgetType == 'HEADER' && widget.size == null) {
                widget.size = 2;
            }
            var newWidget = WidgetService.createWidget(pid, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);

        }
    }
})();