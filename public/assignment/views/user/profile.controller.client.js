(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(parseInt(vm.userId))
                .success(function(user){
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(){
                });
        }
        init();

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
