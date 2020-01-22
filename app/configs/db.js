const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    logging: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.js')(sequelize, Sequelize);
db.role = require('../models/role.js')(sequelize, Sequelize);
db.roleuser = require('../models/role_user')(sequelize, Sequelize);
db.book = require('../models/book.js')(sequelize, Sequelize);
db.order = require('../models/book_users')(sequelize, Sequelize);
db.comment = require('../models/comments')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: db.roleuser, foreignKey: 'roleId', otherKey: 'userId' });
db.user.belongsToMany(db.role, { through: db.roleuser, foreignKey: 'userId', otherKey: 'roleId' });

db.book.belongsToMany(db.user, { through: {model: 'book_users', unique: false}, foreignKey: 'bookId', otherKey: 'userId' });
db.user.belongsToMany(db.book, { through: {model: 'book_users', unique: false}, foreignKey: 'userId', otherKey: 'bookId' });

db.book.belongsToMany(db.user, {through: {model: 'comment_users', unique: false}, foreignKey: 'bookId', otherKey: 'userId'});
db.user.belongsToMany(db.book, {through: {model: 'comment_users', unique: false}, foreignKey: 'userId', otherKey: 'bookId'});

db.user.hasMany(db.comment)
db.comment.belongsTo(db.user)

db.book.hasMany(db.comment)
db.comment.belongsTo(db.book)

module.exports = db;