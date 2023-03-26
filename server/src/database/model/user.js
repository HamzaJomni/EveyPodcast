const { Sequelize } = require('sequelize');
const sequelize = require('../index.js');

// Tester la connexion à la base de données
try {
    sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
}

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  GoogleId:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  picture:{
    type: Sequelize.STRING,
    allowNull:true,
  },
});

User.associate = function(models) {
  User.hasMany(models.Podcast, { as: 'podcasts', foreignKey: 'UserId' });
};
sequelize.sync(); // Cette ligne synchronise les modèles avec la base de données


module.exports = { sequelize, User };
