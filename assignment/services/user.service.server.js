module.exports = function (app) {

    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , emailaddress:"111@gmail.com"},
        {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , emailaddress:"222@gmail.com"},
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , emailaddress:"333@gmail.com"},
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , emailaddress:"444@gmail.com"}
    ];

    app.post('/api/user',createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserbyId);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserbyId(req, res) {
        var userId = req.params['userId'];
        for (var u in users) {
            if (users[u]._id === parseInt(userId)) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        for(var u in users) {
            if(users[u]._id === userId) {
                users[u] = user;
            }
        }
        res.send(200);
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        for(var u in users) {
            if(users[u]._id === userId) { 
            users.splice(u,1);
            }
        }
        res.send(200);
    }

}