const db = require('../models');
const Usuario = db.usuario;
const Op = db.Op;
const passport = require('passport');
const moment = require('moment');

const crypto = require('crypto');

function registro(req, res, next) {
    const body = req.body;
    const password = body.password;
    delete body.password;

    const usuario = Usuario.build(body);
    usuario.crearPassowrd(password);
    usuario.save()
            .then(user => {
                return res.status(201).json(user.toAuthJSON())
            })
            .catch(next)
}

function obtenerUsuario(req, res, next) {
    if(res.locals.rol == 'basic') {
        Usuario.findAll({where: {id: req.usuario.id}})
            .then(r => {
                return res.json(r);
            })
            .catch(next)
    }
    else {
        res.status(403).send({mensaje: 'No has especificado el token de autentificacion o no tienes permisos para realizar esta acción.'})
    }
}

function modificarUsuario(req, res, next) {
    if(req.locals.rol === 'basic') {
        Usuario.findById(req.usuario.id)
                    .then(user => {
                        if(!user) {(res.sendStatus(401))}
                        let nuevaInfo = req.body;

                        if(typeof nuevaInfo.nombre !== 'undefined') {
                            user.nombre = nuevaInfo.nombre
                        }

                        if (typeof nuevaInfo.status !== 'undefined')
                            user.status = nuevaInfo.status
                
                        if (typeof nuevaInfo.password !== 'undefined')
                            user.crearPassword(nuevaInfo.password)
                            user.save()
                                    .then(updatedUser => {
                                        res.status(201).json(updatedUser.publicData())
                                    })
                                    .catch(next)
                    })
                    .catch(next)
    }
    else {
        res.status(403).send({mensaje: 'No has especificado el token de autentificacion o no tienes permisos para llevar a cabo esta acción.'})
    }
}


function eliminarUsuario(req, res) {
    if(res.locals.rol === 'Administrador') {
        Usuario.findOneAndDelete({_id: req.usuario.id})
            .then(r => {
                res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
            })
    }
    else {
        res.status(403).send({mensaje: `No has especificado el token de autentificacion o no tienes permisos para llevar a cabo esta acción.`})
    }
}

function iniciarSesion(req, res) {
    if(!req.body.id) {
        return res.status(422).json({ errors: {id: ''}})
    }
    if(!req.body.passowrd) {
        return res.status(422).json({errors: {password: ''}})
    }

    passport.authenticate('local', {session: false}, function(err, user, info) {
        if(err) {return next(err);}

        if(user) {
            user.token = user.generarJWT();
            return res.json({user: user.toAuthJSON()});
        }
        else {
            return res.status(422).json(info);
        }
    })(req, res, next)
}

module.exports = {
    obtenerUsuario,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion

}