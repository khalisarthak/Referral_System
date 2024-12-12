const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./Users');

const Earnings = sequelize.define('Earnings', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  referredUserId: { type: DataTypes.INTEGER, allowNull: true },
  directEarnings: { type: DataTypes.FLOAT, defaultValue: 0 },
  indirectEarnings: { type: DataTypes.FLOAT, defaultValue: 0 },
});

Earnings.belongsTo(User, { foreignKey: 'userId' });

module.exports = Earnings;
