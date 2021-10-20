module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('producto', {
        productId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        barcode: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        cost: Sequelize.DOUBLE,
        price: Sequelize.DOUBLE,
        brand: Sequelize.STRING,
        minimumStock: Sequelize.INTEGER,
        category: Sequelize.INTEGER,
        condition: Sequelize.ENUM('NUEVO', 'USADO', 'REACONDICIONADO')
    })

    return Producto
}