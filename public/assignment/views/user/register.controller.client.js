(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            var promise = UserService.findUserByUsername(user.username);
            promise
                .success(function(user){
                    if(user != '0') {
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