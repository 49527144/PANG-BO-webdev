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
        };
        return api;

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
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/user?username=' + username + '&password=' + password);
        }

        function updateUser(user) {
            $http.put("/api/user/" + user._id);
        }

        function deleteUser(userId) {
            $http.delete("/api/user/" + userId);
        }

    }
})();