(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.webId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;


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

            WidgetService
                .findWidgetTypeById(vm.widgetId)
                .success(function (wtype) {
                    if(wtype != '0') {
                        vm.wigtype = wtype;
                    }
                })
                .error(function () {
                });
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