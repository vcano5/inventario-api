module.exports = (sequelize, Sequelize) => {
    const Op = Sequelize.Op;
    const Orden = sequelize.define('ordene', {
        orderId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
    })
    return Orden;
}
