const express = require('express');
const router = express.Router();
const podcastcontroller = require('../controllers/podcast.controller');

const {validateToken}=require('../middlewares/AuthMiddleware');
// Route pour récupérer tous les podcasts
router.get('/podcasts', podcastcontroller.getAllPodcasts);

// Route pour récupérer 6 podcasts d'un topic
router.get('/podcasts/:topic', podcastcontroller.getSixPodcastsByTopic);

// Route pour récupérer tous les podcasts d'un topic
router.get('/allPodcasts/:topic', podcastcontroller.getAllPodcastsByTopic);

// Route pour récupérer un podcast d'un id donnée
router.get('/podcast/:podcast_id', podcastcontroller.getPodcastById);

// Route pour recherche des podcasts selon le nom ou l'auteur
router.get('/search/:searchTerm', podcastcontroller.searchPodcasts);

module.exports = router;