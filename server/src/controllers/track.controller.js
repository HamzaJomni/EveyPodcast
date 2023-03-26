const Track = require('../database/model/track').Track; // Importer le modèle Track
const s3 = require('../aws/aws-config');
const fs = require('fs');

// Route pour récupérer tous les tracks d'un podcast cliqué 
async function getAllTracks(req, res) {
    try {
      const tracks = await Track.findAll();
      res.json(tracks);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
}

// création d'un track pour un podcast
async function postTrack(req, res, next) {
  const podcastId = parseInt(req.params.podcastId);
  if (isNaN(podcastId)) {
    return res.status(400).send('Invalid podcastId');
  }
  const { title, description } = req.body;
  try {
    // envoi du fichier vers AWS S3
    const fileStream = fs.createReadStream(req.file.path);
    const params = {
      Bucket: "evey-podcasts",
      Key: 'tracks_audio/' + Date.now() + '-' + req.file.originalname,
      Body: fileStream,
      ACL: 'public-read',
    };
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);

    // création du nouveau track dans la base de données
    const newTrack = await Track.create({
      title,
      description,
      podcastId,
      trackUrl: data.Location, // utilisation de l'URL retournée par AWS S3
    });
    res.json(newTrack);
  } catch (err) {
    next(err);
  }
}


module.exports = {
    getAllTracks,
    postTrack,
};