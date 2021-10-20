module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define('staff', {
        staffId: {
            type: Sequelize.INTEGER(10),
            primaryKey: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        address: Sequelize.STRING(),
        phone: Sequelize.INTEGER(10),
        email: Sequelize.STRING(40),
        username: Sequelize.STRING(),
        password: Sequelize.STRING,
        roleID: Sequelize.INTEGER(10)
    })
    return Staff;
}