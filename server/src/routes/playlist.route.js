const express = require('express');
const router = express.Router();
const playlistcontroller = require('../controllers/playlist.controller');


// Route pour récupérer tous les podcasts
router.get('/playlists', playlistcontroller.getAllPlaylist);

// Création d'une playlist pour un user
router.post('/newplaylist/:userId', playlistcontroller.postPlaylist);

// Création d'une playlist pour un user
router.delete('/deletePlaylist/:playlistId', playlistcontroller.deletePlaylist);


module.exports = router;