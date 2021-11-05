module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        userId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        salt: Sequelize.STRING(1024),
        hash: Sequelize.STRING(1024),
        profilePicture: Sequelize.STRING(512),
        token: Sequelize.STRING(1024),
        lastLogin: Sequelize.DATE(6),
        lastMovement: Sequelize.DATE(6)
    })

    return Usuario;
}