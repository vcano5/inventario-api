const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('../models'),
    Usuario = db.usuario,
    Sequelize = require('sequelize');

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    }, function(id, password, done) {
        Usuario.findOne({id: id})
            .then(user => {
                if(!user || !user.validarPassword(password)) {
                    return done(null, false, {errors: {'email o contraseña': 'equivocados'}});
                }
                return done(null, user);
            })
            .catch(done);
    }))