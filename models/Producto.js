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
        image: Sequelize.STRING(1024),
        minimumStock: Sequelize.INTEGER,
        category: Sequelize.STRING,
        condition: Sequelize.STRING//('NUEVO', 'USADO', 'REACONDICIONADO')
    })

    return Producto
}