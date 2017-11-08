var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
        passReqToCallback : true
        },
        function(req, username, password, done) {
            // busca en mongo si username existe
            User.findOne({ 'username' :  username },
                function(err, user) {
                    // En caso de error retorna error con metodo done
                    if (err)
                        return done(err);
                    // Username no existe, error log y retorna
                    if (!user){
                        console.log('Nombre Usuario *? '+ username);
                        return done(null, false, req.flash('message', 'Nombre Usuario*?'));
                    }
                    // User existe pero no es la password, error log
                    if (!isValidPassword(user, password)){
                        console.log('Contraseña *? ');
                        return done(null, false, req.flash('message', 'Contraseña *?')); // redirect back to login page
                    }
                    // User y password coinciden, pasa user con metodo done
                    return done(null, user);
                }
            );
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
}
