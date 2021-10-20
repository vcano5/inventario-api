const Sequelize = require('sequelize')
let dev = process.env.NODE_ENV === "development"

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: dev
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.articulo = require('./Articulo.js')(sequelize, Sequelize);
// db.categoria = require('./Categoria.js')(sequelize, Sequelize);


db.usuario = require('./Usuario')(sequelize, Sequelize);
db.cliente = require('./Cliente')(sequelize, Sequelize);
db.proveedor = require('./Proveedor')(sequelize, Sequelize);
db.orden = require('./Orden')(sequelize, Sequelize);
db.categoria = require('./Categoria')(sequelize, Sequelize)
db.staff = require('./Staff')(sequelize, Sequelize)
db.detallesDeOrden = require('./detallesDeOrden')(sequelize, Sequelize);
db.producto = require('./Producto')(sequelize, Sequelize);
db.inventario = require('./Inventario')(sequelize, Sequelize);

// db.cliente.hasMany(db.staff, {foreignKey: 'staffID', as: 'staffID'})
db.staff.hasMany(db.cliente, {as: 'clientes'})
db.cliente.belongsTo(db.staff, {
    foreignKey: 'id',
    as: 'staffID'
})


db.cliente.hasMany(db.orden, {foreignKey: 'clientId'})
db.orden.belongsTo(db.cliente, {foreignKey: 'clientId'})
db.orden.hasMany(db.detallesDeOrden, {as: 'detallesDeLaOrden', foreignKey: 'ordenPadre'})
db.detallesDeOrden.belongsTo(db.producto, {foreignKey: 'productId'})
db.proveedor.hasMany(db.inventario, {foreignKey: 'supplierId'})
db.inventario.belongsTo(db.proveedor, {foreignKey: 'supplierId'})
db.inventario.belongsTo(db.orden, {foreignKey: 'orderId'})
db.producto.hasMany(db.inventario, { foreignKey: 'productId' })

module.exports = db;