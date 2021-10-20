module.exports = (sequelize, Sequelize) => {
    const Proveedores = sequelize.define('proveedore', {
        supplierId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        address: Sequelize.STRING(256),
        phone: Sequelize.INTEGER(10),
        email: Sequelize.STRING(40),
        otherDetails: Sequelize.STRING
    })
    return Proveedores;
}