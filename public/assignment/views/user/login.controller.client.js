(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login (username, password) {

              if(!username || !password) {
                vm.error = ("Field cannot be empty");
                return;
              }


              var inuser = {username: username, password: password};
              UserService
                  .login(inuser)
                  .then(
                      function(response) {
                          var user = response.data;
                          $rootScope.currentUser = user;
                          console.log(user._id);
                          $location.url("/user/" + user._id);
                      }
        )}
    }
})();