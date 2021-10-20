Usuario = require('./Usuario')

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        customerId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        firstName: Sequelize.STRING(40),
        lastName: Sequelize.STRING(40),
        address: Sequelize.STRING(40),
        phone: Sequelize.INTEGER(10),
        email: Sequelize.STRING(40)
    })
    return Cliente;
}