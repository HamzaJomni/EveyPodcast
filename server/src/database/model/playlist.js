const { DataTypes } = require('sequelize');
const sequelize = require('../index');

/*
// Tester la connexion à la base de données
try {
  sequelize.authenticate();
  console.log('Connexion à la base de données réussie.');
} catch (error) {
  console.error('Impossible de se connecter à la base de données:', error);
}
*/

// Modèle de la table playlist
const Playlist = sequelize.define('playlist',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
Playlist.associate = function(models) {
    Playlist.hasMany(models.Podcast, { as: 'podcasts', foreignKey: 'playlistId' });
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
  };

  

sequelize.sync(); // Cette ligne synchronise les modèles avec la base de données

module.exports = { sequelize, Playlist };
