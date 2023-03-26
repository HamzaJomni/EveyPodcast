const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = require('../index.js');

// Tester la connexion à la base de données
try {
    sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
}


// Modèle de la table Podcasts
const Podcast = sequelize.define('podcast', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    topic:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
});
Podcast.associate = (models) => {
    Podcast.belongsTo(models.User);
  };

  Podcast.associate = function(models) {
   
    Podcast.belongsTo(models.User, { foreignKey: 'userId' });
  };

sequelize.sync(); // Cette ligne synchronise les modèles avec la base de données


module.exports = { sequelize, Podcast };