const Playlist = require('../database/model/playlist').Playlist; // Importer le modèle Playlist
const PlaylistPodcast = require('../database/model/playlist_podcast').PlaylistPodcast; // Importer le modèle Playlist

// Route pour récupérer tous les podcasts
async function getAllPlaylist(req, res) {
    try { 
      const playlists = await Playlist.findAll();
      res.json(playlists);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
}

// création d'une playlist pour un user
async function postPlaylist(req, res, next) {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).send('Invalid userId');
  }
  try {
    // création d'une nouvelle playlist dans la base de données
    const { title } = req.body;
    const newPlaylist = await Playlist.create({
      title,
      userId,
    });
    res.json(newPlaylist);
  } catch (err) {
    next(err);
  }
}

// Suppression d'une playlist et tous ces lignes dans la table joiture paylist_podcast
async function deletePlaylist(req, res) {
  const playlistId = req.params.playlistId;
  try {
    // Supprimer les entrées correspondantes dans la table de jointure
    await PlaylistPodcast.destroy({ where: { playlistId: playlistId }});
    
    // Supprimer la playlist
    const playlist = await Playlist.findByPk(playlistId);
    await playlist.destroy();
    
    res.status(200).json({ message: `Playlist ${playlist.title} a été supprimée avec succès` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la playlist' });
  }
}


module.exports = {
    getAllPlaylist,
    postPlaylist,
    deletePlaylist
};