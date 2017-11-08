var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

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
                      }else{
                        console.log('Estamos aqui y de aqui no pasa nada....');
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+ username);
                        User.username = req.body('username');
                        User.password = createHash(req.body('password'));
                        User.email = req.body('email');
                        User.names = req.body('names');
                        User.surnames = req.body('surnames');
                        User.born = req.body(isodate('born'));
                        User.sex = req.body('sex');
                        User.street = req.body('street');
                        User.distrit = req.body('distrit');
                        User.city = req.body('city');
                        User.code = req.body('code');
                        User.number = req.body('number');
                        //
                        User.save(function(err) {
                          if (err){
                              console.log('Error in Saving user: '+err);
                              throw err;
                          }
                          console.log('User Update succesful');
                          return done(null, user);
                        });
                        } else {
                          console.log('User Not exists');
                          return done(null, user);
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
