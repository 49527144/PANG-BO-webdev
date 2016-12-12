module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/user',createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserbyId);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));

    var facebookConfig = {
        clientID     : "1369256486420982",
        clientSecret : "8426ed82ab966e60ac58b550e11659f2",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(function(facebookUser){
                    if(facebookUser) {
                        return done(null, facebookUser);
                    }
                    else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                id:    profile.id,
                                token: token,
                                displayName: profile.displayName
                            }
                        };
                    return model.userModel.createUser(facebookUser);
                }
            },
            function(error) {
                if (error) {
                    return done(error);
                }
            })
            .then(
                function(user) {
                    return done(null, user);
                },
                function (error) {
                    if (error) {
                        return done(error);
                    }
                });
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
       model
           .userModel
           .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        model.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    // var users = [
    //     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , emailaddress:"111@gmail.com"},
    //     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , emailaddress:"222@gmail.com"},
    //     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , emailaddress:"333@gmail.com"},
    //     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , emailaddress:"444@gmail.com"}
    // ];


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        console.log("here");
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        // console.log("this is good");
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    // console.log("this is very good");
                    res.send(newUser);
                },
                function(error) {
                    // console.log("this is bad");
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
        } else {
            res.json(req.user);
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