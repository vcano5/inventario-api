Usuario = require('./Usuario')

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        customerId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        firstName: Sequelize.STRING(40),
        lastName: Sequelize.STRING(40),
        address: Sequelize.STRING(500),
        phone: Sequelize.BIGINT(10),
        email: Sequelize.STRING(40)
    })
    return Cliente;
}