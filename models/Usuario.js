const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = (sequelize, Sequelize) => {
    const Op = Sequelize.Op;
    const Usuario = sequelize.define("usuario", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
        email: Sequelize.STRING,
        salt: Sequelize.STRING,
        status: Sequelize.STRING,
        hash: {
            type: Sequelize.STRING(1024)
        },
        rol: {
            type: Sequelize.STRING,
            defaultValue: 'basic'
        }
    })

    Usuario.prototype.crearPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto
                        .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
    }
    
    Usuario.prototype.validarPassowrd = function(password) {
        const hash = crypto
                        .pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
                        .toString('hex');
        return this.hash = hash;
    }
    
    Usuario.prototype.generarJWT = function() {
        const hoy = newDate();
        const expDate = new Date(hoy);
        expDate.setDate(hoy.getDate() + 7);
    
        return jwt.sign({
            id: this.id,
            nombre: this.nombre,
            exp: parseInt(expDate.getTime() / 1000)
        }, process.env.SECRET)
    }
    
    Usuario.prototype.toAuthJSON = function() {
        return {
            nombre: this.nombre,
            id: this.id,
            token: this.generarJWT()
        }
    }
    
    Usuario.prototype.publicData = function() {
        return {
            id: this.id,
            nombre: this.nombre,
            createdAt: this.createdAt,
            updateAt: this.updateAt
        }
    }

    return Usuario
}