const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Score = sequelize.define('Score', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Score;