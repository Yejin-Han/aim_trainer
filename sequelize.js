const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("aim_ranking", "root", "my_root1234!@#$", {
    host: "127.0.0.1",
    dialect: 'mysql'
});

// sequelize.sync({ alter: true });

module.exports = sequelize;