(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            findcurrentUser: findcurrentUser
        };
        return api;

        function findcurrentUser() {
            return $http.get('/api/user');
        }

        function createUser(user) {
            var newuser = {
                username: user.username,
                password: user.password
            }
            return $http.post('/api/user/', newuser);
        }

        function findUserById(userId) {
            return $http.get('/api/user/' + userId);
        }

        function findUserByUsername(username) {
            return $http.get('/api/user?username=' + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/user?username=' + username + '&password=' + password);
        }

        function updateUser(user) {
            $http.put("/api/user/" + user._id, user);
        }

        function deleteUser(userId) {
            $http.delete("/api/user/" + userId);
        }

        function login(user) {
            console.log("step");
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            // console.log("111");
            return $http.post('/api/register', user);
        }

    }
})();