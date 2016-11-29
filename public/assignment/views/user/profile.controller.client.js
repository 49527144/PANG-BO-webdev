(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        var user = UserService.findUserById(vm.userId);
        vm.users = UserService.allUsers();
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        if(user != null) {
            vm.user = user;
        }

        function updateUser(currentuser) {
            currentuser = vm.user;
            UserService.updateUser(user);
            vm.success = "Updated the user";
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
        }
    }
})();
