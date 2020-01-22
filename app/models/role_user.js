module.exports = (sequelize, Sequelize) => {
    const Roleuser = sequelize.define('role_users', {
         status: {
            type: Sequelize.STRING,
            defaultValue: "Unblock"
        }
    });
    return Roleuser;
}