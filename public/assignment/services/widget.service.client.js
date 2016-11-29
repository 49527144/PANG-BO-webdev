(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            findWidgetTypeById: findWidgetTypeById
        };
        return api;

        function createWidget(widget) {
            return $http.post('/api/page/' + widget.pageId + '/widget', widget);
        }

        function findWidgetById(wid) {
            return $http.get('/api/widget/'+ wid);
        }

        function findWidgetsByPageId(pid) {
            return $http.get('/api/page/' + pid + '/widget');
        }

        function updateWidget(widget) {
            $http.put("/api/widget/" + widget._id, widget);
        }

        function deleteWidget(widgetId) {
            $http.delete("/api/widget/" + widgetId);
        }

        function findWidgetTypeById(wid) {
            var url = '/api/wigitype/'+wid;
            return $http.get(url);
        }
    }
})();