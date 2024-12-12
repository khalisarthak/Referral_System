const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('referral_system', 'root', 'sarthak', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connection Established');
  } catch (err) {
    console.error('Database Connection Failure ', err);
  }
};

module.exports = { sequelize, connectDB };