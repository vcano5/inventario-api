module.exports = (sequelize, Sequelize) => {
    const Inventario = sequelize.define('inventario', {
        stockId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        type: Sequelize.ENUM('IN', 'OUT'),
        quantity: Sequelize.INTEGER,
        date: Sequelize.DATE(6),
        reason: Sequelize.STRING
    })
    return Inventario;
}