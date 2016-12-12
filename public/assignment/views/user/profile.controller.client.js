(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            if (vm.userId) {
                UserService.findUserById(vm.userId).success(
                    function(user) {
                        if(user != '0') {
                            vm.user = user;
                        }
                    }).error(function(){

                    });
            } else {
                UserService
                    .findcurrentUser().success(function(user) {
                        if(user != '0') {
                            vm.user = user;
                            vm.userId = user._id;
                        }
                    })
                }
            }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }

        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }
})();