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
db.articulo = require('./Articulo.js')(sequelize, Sequelize);
db.categoria = require('./Categoria.js')(sequelize, Sequelize);

module.exports = db;