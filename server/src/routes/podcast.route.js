const express = require('express');
const router = express.Router();
const podcastcontroller = require('../controllers/podcast.controller');
/*const s3 = require('../aws/aws-config');
const multerS3 = require('multer-s3');*/
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


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

// création d'un podcast
router.post('/newPodcast', podcastcontroller.postPodcast);

// exportation et importation d'une image vers aws s3
router.post('/uploadPodcastImage', upload.single('image'), podcastcontroller.postImagePodcast);


module.exports = router;