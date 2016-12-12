(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeChooserController", WidgeChooserController);

    function WidgeChooserController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.wigetId = $routeParams['wgid'];

        vm.createWidget = createWidget;

        function inti() {
            var promise = WidgetService.findWidgetbyId(vm.wigetId);
            promise
                .success(function (temp) {
                    if(temp != '0') {
                        vm.widget = temp;
                    }
                })
                .error(function () {
                });
        }
        inti();

        function createWidget(pid, widget) {

            // if(!widget || !widget.name) {
            //     vm.error = ("Widget name cannot be empty");
            //     return;
            // }


            widget.pageId = pid;
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