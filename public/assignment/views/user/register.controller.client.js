(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {

            if(!user.username) {
                vm.error = ("Username cannot be empty");
                return;
            }

            if(user.password != user.password2 || 
                !user.password || !user.password2) {
                vm.error = ("Please enter the same password");
                return;
            } 

        UserService
            .register(user)
            .then(
                function(response) {
                    var user = response.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/"+user._id);
            });
        }
    }
})();