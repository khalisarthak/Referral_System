const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./Users');

const Purchases = sequelize.define('Purchases', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  purchaseAmount: { type: DataTypes.FLOAT, allowNull: false }
});

Purchases.belongsTo(User, { foreignKey: 'userId' });

module.exports = Purchases;
