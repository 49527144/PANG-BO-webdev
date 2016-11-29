(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function init() {
            vm.users = UserService.allUsers();

        }
        init();

        function createUser(user) {
            if(user.password != user.password2 || !user.password || !user.password2) {
                return;
            }
            if(UserService.findUserByUsername(user.username) != null) {
                return;
            }
            else{
                user._id = (new Date()).getTime().toString();
                UserService.createUser(user);
                $location.url("/user/"+ user._id);
            }
        }
    }
})();