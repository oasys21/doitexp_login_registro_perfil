var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
//
module.exports = function(passport){
//
  passport.use('profiles', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
						findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in Profile: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('Pasamos aqui donde cambiamos datos '+err);
                        var newUser = user;
                        newUser.username = req.param('username');
                        newUser.password = req.param('password');
                        newUser.email = req.param('email');
                        newUser.names = req.param('names');
                        newUser.surnames = req.param('surnames');
												newUser.born = req.param('born');
												newUser.sex = req.param('sex');
												newUser.street = req.param('street');
												newUser.distrit = req.param('distrit');
												newUser.city = req.param('city');
												newUser.code = req.param('code');
												newUser.number = req.param('number');
                        //
                        // newUser.password = createHash(req.param('password'));
                        // if (bCrypt.compareSync(password, newuser.password) {
                        //   return done(null, false, req.flash('message', 'Contraseña *?')); // redirect back to login page
                        // }
                        // save the user
                        //
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Update succesful');
                            return done(null, newUser);
                        });
                        } else {
                          console.log('Usuario No Existe');
                          return done(null, user);
                    }
                  });
            }
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }))
        // Generates hash using bCrypt
        var createHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        };
};
