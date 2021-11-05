const db = require('../models');
const Usuario = db.usuario;
const Op = db.Op;
const passport = require('passport');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const crypto = require('crypto');

exports.registro = (req, res) => {
    const body = req.body;
    //res.send(body)
    const password = body.password;
    delete body.password;
    body.salt = crypto.randomBytes(16).toString('hex');
    body.hash = crypto.pbkdf2Sync(password, body.salt, 1000, 512, 'sha512').toString('hex');

    Usuario.create({
        userId: uuidv4(),
        name: body.name,
        email: body.email,
        salt: body.salt,
        hash: body.hash,
        token: crypto.randomBytes(16).toString('hex'),
        profilePicture: 'https://scontent.ftrc3-1.fna.fbcdn.net/v/t1.6435-9/fr/cp0/e15/q65/64805823_2348305738813685_6803018692654268416_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=_PSMBfo27pwAX8qYEB4&_nc_ht=scontent.ftrc3-1.fna&oh=07ef6d94477b85750dadd7507d319b23&oe=619A008E',
        lastLogin: new Date(),
        lastMovement: new Date()
    })
        .then((u) => {
            res.json(u);
        })
}

exports.getUserInfo = (req, res) => {
    if(req.params.userId) {
        Usuario.findAll({where: {userId: req.params.userId}})
            .then((u) => {
                if(u.length > 0) {
                    info = {
                        name: u[0]['name'],
                        email: u[0]['email'],
                        profilePicture: u[0]['profilePicture'],
                        lastLogin: u[0]['lastLogin']
                    }
                    res.send(info)
                }
                else {
                    res.send({message: 'No existen usuarios con ese id'}).status(404)
                }
            })
    }
    else {
        res.send({message: 'Falta el usuario'}).status(400)
    }
}

exports.isValidToken = (req, res) => {
    if(req.query.accessToken && req.query.email) {
        Usuario.findAll({where: {email: decodeURI(req.query.email)}})
            .then(r => {
                console.log(`${r[0].token} ${req.query.accessToken} ${r[0].token==req.query.accessToken}`)
                if(r.length > 0) {
                    if(r[0].token == req.query.accessToken) {
                        res.send({message: 'Es correcto'})
                    }
                    else {
                        res.send({message: 'El token de acceso ha cambiado'})
                    }
                }
                else {
                    console.log('No hay ')
                    res.send({message: 'No se han encontrado resultados'})
                }
            })
            .catch(er => {
                res.send({message: 'No se han encontrado resultados'})
            })

        // try {
        //     Usuario.findAll({where: {accessToken: body.accessToken}})
        //         .then(r => {
        //             if(r.length > 0) {
        //                 res.send({message: 'valido'}).status(200)
        //             }
        //             else {
        //                 res.send({message: 'El token cambio, es necesario cambiarlo'}).status(403)
        //             }
        //         })
        //         .catch((e) => {
        //             console.error(e);
        //         })
        // }
        // catch(errrr) {
        //     res.send(errrr)
        // }
    }
    else {
        res.send({message: 'Es necesario proporcionar el correo electronico y token de acceso'}).status(400)
    }
    
}

exports.getAccessToken = (req, res) => {
    body = req.body;
    console.log(body)
    if(body.email && body.password) {
        db;
        Usuario.findAll({where: {email: body.email}})
            .then((d) => {
                if(d.length > 0) {
                    passH = crypto.pbkdf2Sync(body.password, d[0]['salt'], 1000, 512, 'sha512').toString('hex');
                    if(passH == d[0]['hash']) {
                        t = crypto.randomBytes(16).toString('hex');
                        Usuario.update({token: t},{where: {userId: d[0]['userId']}})
                            .then(result => {
                                res.json({accessToken: t})
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                    else {
                        res.send({message: 'Contraseña o email incorrecto.'}).status(403)
                    }
                }
                else {
                    res.send({message: 'El usuario no esta registrado'}).status(404)
                }
               
            })
            .catch(e => {
                console.error(e)
            })
    }
    else {
        res.status(400).send({message: 'Falta correo electronico o contraseña.'})
    }
} 

// function registro(req, res, next) {
//     const body = req.body;
//     const password = body.password;
//     delete body.password;

//     const usuario = Usuario.build(body);
//     usuario.password = crearPassowrd(password);
//     usuario.save()
//             .then(user => {
//                 return res.status(201).json(user.toAuthJSON())
//             })
//             .catch(next)
// }

// function obtenerUsuario(req, res, next) {
//     if(res.locals.rol == 'basic') {
//         Usuario.findAll({where: {id: req.usuario.id}})
//             .then(r => {
//                 return res.json(r);
//             })
//             .catch(next)
//     }
//     else {
//         res.status(403).send({mensaje: 'No has especificado el token de autentificacion o no tienes permisos para realizar esta acción.'})
//     }
// }

// function modificarUsuario(req, res, next) {
//     if(req.locals.rol === 'basic') {
//         Usuario.findById(req.usuario.id)
//                     .then(user => {
//                         if(!user) {(res.sendStatus(401))}
//                         let nuevaInfo = req.body;

//                         if(typeof nuevaInfo.nombre !== 'undefined') {
//                             user.nombre = nuevaInfo.nombre
//                         }

//                         if (typeof nuevaInfo.status !== 'undefined')
//                             user.status = nuevaInfo.status
                
//                         if (typeof nuevaInfo.password !== 'undefined')
//                             user.crearPassword(nuevaInfo.password)
//                             user.save()
//                                     .then(updatedUser => {
//                                         res.status(201).json(updatedUser.publicData())
//                                     })
//                                     .catch(next)
//                     })
//                     .catch(next)
//     }
//     else {
//         res.status(403).send({mensaje: 'No has especificado el token de autentificacion o no tienes permisos para llevar a cabo esta acción.'})
//     }
// }


// function eliminarUsuario(req, res) {
//     if(res.locals.rol === 'Administrador') {
//         Usuario.findOneAndDelete({_id: req.usuario.id})
//             .then(r => {
//                 res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
//             })
//     }
//     else {
//         res.status(403).send({mensaje: `No has especificado el token de autentificacion o no tienes permisos para llevar a cabo esta acción.`})
//     }
// }

// function iniciarSesion(req, res) {
//     if(!req.body.id) {
//         return res.status(422).json({ errors: {id: ''}})
//     }
//     if(!req.body.passowrd) {
//         return res.status(422).json({errors: {password: ''}})
//     }

//     passport.authenticate('local', {session: false}, function(err, user, info) {
//         if(err) {return next(err);}

//         if(user) {
//             user.token = user.generarJWT();
//             return res.json({user: user.toAuthJSON()});
//         }
//         else {
//             return res.status(422).json(info);
//         }
//     })(req, res, next)
// }

// function crearPassword(password) {
//     pass = {}
//     pass.salt = crypto.randomBytes(16).toString('hex');
//     pass.hash = crypto
//                     .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
//                     .toString('hex');
//     return pass;
// }

// function validarPassowrd(password, h) {
//     const hash = crypto
//                     .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
//                     .toString('hex');
//     return h = hash;
// }

// function generarJWT(id, nombre) {
//     const hoy = newDate();
//     const expDate = new Date(hoy);
//     expDate.setDate(hoy.getDate() + 7);

//     return jwt.sign({
//         id: id,
//         nombre: nombre,
//         exp: parseInt(expDate.getTime() / 1000)
//     }, process.env.SECRET)
// }

// function toAuthJSON(nombre, id) {
//     return {
//         nombre: nombre,
//         id: id,
//         token: generarJWT(id, nombre)
//     }
// }

// Usuario.prototype.publicData = function() {
//     return {
//         id: this.id,
//         nombre: this.nombre,
//         createdAt: this.createdAt,
//         updateAt: this.updateAt
//     }
// }


// module.exports = {
//     obtenerUsuario,
//     modificarUsuario,
//     eliminarUsuario,
//     iniciarSesion,
//     registro

// }