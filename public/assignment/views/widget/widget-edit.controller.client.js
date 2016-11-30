(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeEditController", WidgeEditController);

    function WidgeEditController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.wigetId = $routeParams['wgid'];
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService.findWidgetbyId(vm.wigetId)
                .success(function (temp) {
                    if(temp != '0') {
                        vm.widget = temp;
                        vm.wigtype = temp.widgetType.toLowerCase();
                    }
                })
                .error(function () {
                });
        }

        init();

        function updateWidget(currentwidget) {
            currentwidget = vm.widget;
            var updated = WidgetService.updateWidget(currentwidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget(wgid) {
            wgid = vm.widget._id;
            WidgetService.deleteWidget(wgid);
            alert("This Widget has been removed, click back to widget list")
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }
    }
})();