(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            if(user.password != user.password2 || 
                !user.password || !user.password2) {
                vm.error = "Please enter the same password";
                return;
            }
            var promise = UserService.findUserByUsername(user.username);
            promise
                .success(function(temp){
                    if(temp != '0') {
                        vm.error = "Username already exist!!!";
                    }
                    else {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url("/user/" + user._id);

                        })
                        .error(function (error) {

                        })
                    }
                });
        }
    }
})();