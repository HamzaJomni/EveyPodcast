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
// Modèle de la table de jointure playlist_podcast
const PlaylistPodcast = sequelize.define('playlist_podcast', {
  playlistId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Playlists',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  podcastId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Podcasts',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

PlaylistPodcast.associate = function(models) {
  PlaylistPodcast.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
  PlaylistPodcast.belongsTo(models.Podcast, { foreignKey: 'podcastId' });
};

sequelize.sync(); // Cette ligne synchronise les modèles avec la base de données

module.exports = { sequelize, PlaylistPodcast };
