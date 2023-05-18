const express = require('express');
const router = express.Router();
const playlist_podcast_controller = require('../controllers/playlist_podcast.controller');


// Route pour récupérer tous les podcasts
router.get('/playlists_podcasts', playlist_podcast_controller.getPlaylists_Podcasts);

// Route pour récupérer tous les podcasts
router.post('/playlist/:playlistId/podcast/:podcastId',playlist_podcast_controller.postPlaylists_Podcasts);

// Route pour remove Podcast From Playlist
router.delete('/removePodcast/playlist/:playlistId/podcast/:podcastId', playlist_podcast_controller.removePodcastFromPlaylist);


module.exports = router;