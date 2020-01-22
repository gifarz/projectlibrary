module.exports = (sequelize, Sequelize) => {
    const Bookuser = sequelize.define('book_users', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })

return Bookuser;

}