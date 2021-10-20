module.exports = (sequelize, Sequelize) => {
    const detallesDeOrden = sequelize.define('detallesDeOrdenes', {
        orderDetailsId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        unitaryPrice: Sequelize.FLOAT(8),
        size: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
        discount: Sequelize.INTEGER,
        total: Sequelize.FLOAT(8),
        date: Sequelize.DATE(6),
    })

    return detallesDeOrden;
}