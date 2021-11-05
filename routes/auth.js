const secret = require('../config').secret;
const db = require('../models')
const Usuario = db.usuario;

function getTokenFromHeader(req) {
    const rHA = req.headers.authorization;
    if(rHA && rHA.split(' ')[0] == 'Token' || rHA && rHA.split(' ')[0] == 'Bearer') {
        return rHA.split(' ')[1];
    }
    return null;
}

const auth = {
    // requerido: jwt({
    //     secret: secret,
    //     algorithms: ['HS256'],
    //     userProperty: 'usuario',
    //     getToken: getTokenFromHeader
    // }),
    requerido: (req, res, next) => {
        //console.log(req.headers)
        // t = getTokenFromHeader(req);
        if(getTokenFromHeader(req)) {
            Usuario.findAll({where: {token: getTokenFromHeader(req)}})
            .then((d) => {
                // res.send({message: 'Es necesario iniciar sesion de nuevo'}).status(403)
                if(d && d.length > 0) {
                    next()
                }
                else {
                    next()
                    // res.send({message: 'El token ha expirado.'}).status(403)
                }
            })
        }
        else {
            next()
            // res.send({message: 'Es necesario proporcionar un token de autorización.'}).status(403)
        }
        
        //next()
    },
    opcional: {
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    }
}

module.exports = auth;