module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        published_date: {
            type: Sequelize.DATE
        },
        pages: {
            type: Sequelize.INTEGER
        },
        language: {
            type: Sequelize.STRING
        },
        publisher_id: {
            type: Sequelize.STRING
        }
    });

    return Book;
}