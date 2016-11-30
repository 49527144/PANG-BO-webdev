(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(userId)
                .then(function(temp) {
                    vm.user=temp.data;
                })
            UserService.allUsers()
                .success(function(alluser) {
                    if(alluser != '[]') {
                        vm.users = alluser;
                    }
                })
                .error(function () {
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