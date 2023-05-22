const Track = require('../database/model/track').Track; // Importer le modèle Track
const s3 = require('../aws/aws-config');
const fs = require('fs');
const https = require('https');
const { PassThrough } = require('stream');
const { Upload } = require("@aws-sdk/lib-storage");
var AWS = require("aws-sdk");
const io = require('socket.io-client');
const { S3Client } = require('@aws-sdk/client-s3');
const { ManagedUpload } = require('@aws-sdk/lib-storage');


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
  try {
// envoi du fichier vers AWS S3
const fileStream = fs.createReadStream(req.file.path);
const params = {
  Bucket: "evey-podcasts",
  Key: 'tracks_audio/' + Date.now() + '-' + req.file.originalname,
  Body: fileStream,
  ACL: 'public-read',
};
const options = {
  httpOptions: {
    timeout: 1800000, // 30 minutes en millisecondes
    agent: new https.Agent({
      keepAlive: true,
      keepAliveTimeout: 1800000 // 30 minutes en millisecondes
    })
  }
};

let uploadedBytes = 0; // variable pour stocker la taille des données envoyées
const totalBytes = fs.statSync(req.file.path).size; // taille totale du fichier

const uploadPromise = s3.upload(params, options).promise();
// ici suivre l'événement 'data' pour calculer la progression de l'envoi
fileStream.on('data', (chunk) => {
  uploadedBytes += chunk.length;
  const progress = Math.round((uploadedBytes / totalBytes) * 100);
  console.log(`Upload progress: ${progress}%`);
});

const data = await uploadPromise;
console.log(`File uploaded successfully. ${data.Location}`);

    // création du nouveau track dans la base de données
    const { title, description } = req.body;
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

//Route pour modifier les données d'un track, et sont fichier son dans aws 
async function editTrack(req, res, next) {
  const trackId = parseInt(req.params.trackId);
  if (isNaN(trackId)) {
    return res.status(400).send('Invalid trackId');
  }
  try {
    const track = await Track.findByPk(trackId);
  if (!track) {
    return res.status(404).send('Track not found');
  }

  // Mettre à jour les propriétés du track avec les nouvelles valeurs
  if (req.body.title) {
    track.title = req.body.title;
  }
  if (req.body.description) {
    track.description = req.body.description;
  }

  if (req.file) {
    // Envoi du nouveau fichier vers AWS S3
    const fileStream = fs.createReadStream(req.file.path);
    const params = {
      Bucket: "evey-podcasts",
      Key: 'tracks_audio/' + Date.now() + '-' + req.file.originalname,
      Body: fileStream,
      ACL: 'public-read',
    };
    const options = {
      httpOptions: {
        timeout: 1800000, // 30 minutes en millisecondes
        agent: new https.Agent({
          keepAlive: true,
          keepAliveTimeout: 1800000 // 30 minutes en millisecondes
        })
      }
    };

    let uploadedBytes = 0; // variable pour stocker la taille des données envoyées
    const totalBytes = fs.statSync(req.file.path).size; // taille totale du fichier

    const uploadPromise = s3.upload(params, options).promise();
    // ici suivre l'événement 'data' pour calculer la progression de l'envoi
    fileStream.on('data', (chunk) => {
      uploadedBytes += chunk.length;
      const progress = Math.round((uploadedBytes / totalBytes) * 100);
      console.log(`Upload progress: ${progress}%`);
    });

    const data = await uploadPromise;
    console.log(`New file uploaded successfully. ${data.Location}`);

    // Déplacer l'ancien fichier dans le dossier "tracks_deleted" dans AWS S3
    // Construire la clé de l'ancien fichier audio
    const trackUrl = track.trackUrl;
    const trackKey = trackUrl.substring(trackUrl.lastIndexOf("/") + 1);
    const oldTrackKey = "tracks_audio/" + trackKey;
    const newTrackKey = "tracks_deleted/" + trackKey;
    const paramsTrackMove = {
      Bucket: "evey-podcasts",
      CopySource: `/${"evey-podcasts"}/${oldTrackKey}`,
      Key: newTrackKey,
    };
    await s3.copyObject(paramsTrackMove).promise();
    console.log(`Old track moved successfully in "tracks_deleted" folder`);


    // Mettre à jour l'URL du fichier son dans la base de données avec l'URL du nouveau fichier
    track.trackUrl = data.Location;
  }
  // Enregistrer les modifications du track dans la base de données
  const updatedTrack = await track.save();
  res.json(updatedTrack);
  } catch (err) {
    next(err);
  }
}

//Route pour supprimer un track
async function deleteTrack(req, res, next) {
  const trackId = parseInt(req.params.trackId);
  if (isNaN(trackId)) {
    return res.status(400).send('Invalid trackId');
  }

  try {
    const track = await Track.findByPk(trackId);
    if (!track) {
      return res.status(404).send('Track not found');
    }

    // Déplacer l'ancien fichier dans le dossier "tracks_deleted" dans AWS S3
    const oldUrl = track.trackUrl;
    const Key = oldUrl.substring(oldUrl.lastIndexOf("/") + 1);
    const oldKey = "tracks_audio/" + Key;
    const newKey = "tracks_deleted/" + Key;
    const paramsMove = {
      Bucket: "evey-podcasts",
      CopySource: `/${"evey-podcasts"}/${oldKey}`,
      Key: newKey,
    };
    await s3.copyObject(paramsMove).promise();
    console.log(`Old track moved successfully in "tracks_deleted" folder`);

    // Supprimer le track de la base de données
    await Track.destroy({ where: { id: trackId } });

    res.send(`Track ${trackId} deleted successfully`);
  } catch (err) {
    next(err);
  }
}

//temps moyen d'un track 
async function updateTimeListened (req, res)  {
  const { trackId, listeningTime } = req.body;
  console.log(trackId);
  console.log(listeningTime);
  try {
      const track=await Track.findOne({ where: { id: trackId } });
      
      if (!track) {
          return res.status(404).send('Track not found');
      }
      const newNbView = track.nbView + 1;
      const newListeningTime = ((track.listeningTime * track.nbView  + parseFloat(listeningTime)) / newNbView).toFixed(2);;
     // const newListeningTime = (track.listeningTime * track.nbView + listeningTime) / newNbView;
      await track.update({
          nbView: newNbView,
          listeningTime: newListeningTime
      });
      res.send('Listening time saved');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
};
//route pour recuperer un track donnee avec son id 

async function getTrackById(req, res) {
  const trackId = req.params.track_id;
  
  try {
    const trackData = await Track.findOne({ where: { id: trackId } });
    res.json(trackData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la récupération du podcast.');
  }
}
//route pour compter le nombre de track 
//route pour compter le nombre de podcast 
async function countTracks (req, res)  {
  try {
    const count = await Track.count();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
    getAllTracks,
    postTrack,
    editTrack,
    deleteTrack,
    updateTimeListened,
    getTrackById,
    countTracks
};