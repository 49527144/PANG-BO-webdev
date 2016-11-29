(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService,$location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        vm.createWidget = createWidget;


        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {
                    if(widget != '0') {
                        vm.widget = widget;
                    }
                })
                .error(function () {

                });
        }
        init();

        function createWidget(pid, type) {
            console.log("checkpoint");
            widget = {};
            widget.pageId = pid;
            widget.widgetType = type;
            WidgetService
                .createWidget(widget)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                })
                .error(function () {

                })
        }
    }
})();