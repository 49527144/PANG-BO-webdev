(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , emailaddress:"111@gmail.com"},
            {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , emailaddress:"222@gmail.com"},
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , emailaddress:"333@gmail.com"},
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , emailaddress:"444@gmail.com"}
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            allUsers: allUsers
        };
        return api;

        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
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
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                temp = users[u];
                if (temp._id === userId) {
                    users[u] = user;
                }
            }
        }

        function deleteUser(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function allUsers() {
            return users;
        }

    }
})();