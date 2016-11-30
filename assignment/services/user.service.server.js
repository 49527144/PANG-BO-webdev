module.exports = function (app, model) {

    // var users = [
    //     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , emailaddress:"111@gmail.com"},
    //     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , emailaddress:"222@gmail.com"},
    //     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , emailaddress:"333@gmail.com"},
    //     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , emailaddress:"444@gmail.com"}
    // ];

    app.post('/api/user',createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserbyId);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function createUser(req, res) {
        console.log("this is good");
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    console.log("this is very good");
                    res.send(newUser);
                },
                function(error) {
                    console.log("this is bad");
                    res.sendStatus(400).send(error);
                });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error) {

                })
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                });
    }

    function findUserbyId(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
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
        var userId = req.params.userId;
        model
            .userModel
            .updateUser(userId, user)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                });
    }

}