module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categoria', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        displayName: Sequelize.STRING,
        description: Sequelize.STRING(512),
    })

    return Categoria;
}