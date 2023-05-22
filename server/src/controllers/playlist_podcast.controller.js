const PlaylistPodcast = require('../database/model/playlist_podcast').PlaylistPodcast; // Importer le modèle Playlist

// Route pour récupérer tous les podcasts
async function getPlaylists_Podcasts(req, res) {
    try { 
      const Playlists_Podcasts = await PlaylistPodcast.findAll();
      res.json(Playlists_Podcasts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
}

// Route pour ajouter un podcast dans une playlist de l'utilisateur
async function postPlaylists_Podcasts (req, res) { 
  try {
    const { playlistId, podcastId } = req.params;

    // Créer une nouvelle entrée dans la table de jointure playlist_podcast
    const newPlaylistPodcast = await PlaylistPodcast.create({
      playlistId,
      podcastId
    });

    res.status(201).json(newPlaylistPodcast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la jointure' });
  }
};

//Route pour remove Podcast From Playlist
async function removePodcastFromPlaylist (req, res) {
  const { podcastId, playlistId } = req.params;

  try {
    const playlistPodcast = await PlaylistPodcast.findOne({
      where: {
        playlistId: playlistId,
        podcastId: podcastId,
      }
    });

    if (!playlistPodcast) {
      return res.status(404).json({ success: false, message: 'Playlist or podcast not found in jointure table' });
    }

    await playlistPodcast.destroy();

    return res.status(200).json({ success: true, message: 'Podcast removed from playlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
    getPlaylists_Podcasts,
    postPlaylists_Podcasts,
    removePodcastFromPlaylist
};