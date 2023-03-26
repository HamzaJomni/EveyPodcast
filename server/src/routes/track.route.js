const express = require('express');
const router = express.Router();
const trackcontroller = require('../controllers/track.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Route pour récupérer tous les tracks
router.get('/tracks', trackcontroller.getAllTracks);

//exportation fichier sons track à aws s3 et création d'un track pour un podcast
router.post('/newTrack/:podcastId', upload.single('audio'), trackcontroller.postTrack);


module.exports = router;