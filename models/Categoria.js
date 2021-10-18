module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        displayName: Sequelize.STRING,
        categoriaRaiz: Sequelize.BOOLEAN,
        categoriaPadre: Sequelize.INTEGER,
        activo: Sequelize.BOOLEAN,
        fechaActualizacion: Sequelize.DATE,
        palabrasClave: Sequelize.STRING,
        fechaCreacion: Sequelize.DATE
    })

    return Categoria;
}