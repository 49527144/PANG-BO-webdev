(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrController", FlickrController);

    function FlickrController($routeParams, $location, FlickrService, WidgetService){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.wigetId = $routeParams['wgid'];
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.updateWidget = updateWidget;

        function init() {
            WidgetService.findWidgetbyId(vm.wigetId)
                .success(function (wig) {
                    if (wig != '0') {
                        vm.widget = wig;
                        vm.wigtype = wig.widgetType.toLowerCase();
                    }
                })
                .error(function () {

                });
        }
        init();

        function updateWidget() {
            WidgetService
                .selectFlickr(vm.wigetId, vm.url)
                .then(function(status){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.wigetId);
                });
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.url = url;
            alert("You have selected photo" + photo.id);
        }

    }
})();