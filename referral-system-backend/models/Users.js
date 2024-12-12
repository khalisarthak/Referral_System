const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  referredBy: { type: DataTypes.STRING },
  level: { type: DataTypes.INTEGER, defaultValue: 0 },
  referrals: { type: DataTypes.INTEGER, defaultValue: 0 }, // Count of referrals
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = User;
