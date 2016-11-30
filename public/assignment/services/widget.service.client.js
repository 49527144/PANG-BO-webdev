(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            createWidget:createWidget,
            findWidgetbyId:findWidgetbyId,
            findAllWidgetsForPage:findAllWidgetsForPage,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            findWidgetTypeById:findWidgetTypeById,
            selectFlickr:selectFlickr
        }
        return api;

        function createWidget(widget) {
            return $http.post('/api/page/'+ widget.pageId + '/widget', widget);
        }

        function findWidgetbyId(wid) {
            return $http.get('/api/widget/' + wid);
        }

        function findAllWidgetsForPage(pid) {
            return $http.get('/api/page/' + pid + '/widget');
        }

        function updateWidget(widget) {
            $http.put("/api/widget/" + widget._id, widget);
        }

        function deleteWidget(wgid) {
            $http.delete("/api/widget/" + wgid);
        }

        function findWidgetTypeById(wid) {
            return $http.get('/api/wigitype/' + wid);
        }

        function selectFlickr(widgetId, photo) {
            var content = {photo: photo};
            return $http.put('/api/' + widgetId + '/flickr', content);

        }
    }
})();