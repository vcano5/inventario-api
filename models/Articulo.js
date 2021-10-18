module.exports = (sequelize, Sequelize) => {
    const Articulo = sequelize.define("articulo", {
        idArticulo: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        nombre: Sequelize.STRING,
        cantidad: Sequelize.INTEGER,
        descripcion: Sequelize.STRING,
        codigoDeBarras: Sequelize.STRING,
        activo: Sequelize.BOOLEAN,
        costo: Sequelize.DOUBLE,
        precio: Sequelize.DOUBLE,
        marca: Sequelize.STRING,
        inventarioMinimo: Sequelize.INTEGER,
        categoria: Sequelize.INTEGER,
        condicion: Sequelize.ENUM('NUEVO', 'USADO', 'REACONDICIONADO')
    })

    return Articulo
}