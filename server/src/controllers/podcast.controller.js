const Podcast = require('../database/model/podcast').Podcast; // Importer le modèle Podcast
const { Op } = require('sequelize');
const s3 = require('../aws/aws-config');
const fs = require('fs');
const rimraf = require('rimraf');


// Route pour récupérer tous les podcasts
async function getAllPodcasts(req, res) {
    try { 
      const podcasts = await Podcast.findAll();
      res.json(podcasts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
}

// Route pour récupérer 6 podcasts d'un topic
function getSixPodcastsByTopic(req, res) {
    const { topic } = req.params;

    Podcast.findAll({
        where: { topic },
        limit: 6,
    })
    .then((result) => {
    res.send(result);
    })
    .catch((error) => {
    console.log(error);
    res.send(error);
    });
}
  
// Route pour récupérer tous les podcasts d'un topic
function getAllPodcastsByTopic(req, res) {
const { topic } = req.params;

Podcast.findAll({
    where: { topic },
})
    .then((result) => {
    res.send(result);
    })
    .catch((error) => {
    console.log(error);
    res.send(error);
    });
}
  
// Route pour récupérer un podcast d'un id donnée
async function getPodcastById(req, res) {
    const podcastId = req.params.podcast_id;
    try {
      const podcastData = await Podcast.findOne({ where: { id: podcastId } });
      res.json(podcastData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Une erreur est survenue lors de la récupération du podcast.');
    }
  }
  
// Route pour recherche des podcasts selon le nom ou l'auteur
async function searchPodcasts(req, res) {
const searchQuery = req.params.searchTerm;
const podcasts = await Podcast.findAll({
    where: {
    [Op.or]: [
        { title: { [Op.like]: `%${searchQuery}%` } },
        { author: { [Op.like]: `%${searchQuery}%` } },
    ]
    }
});
res.json(podcasts);
}

//création d'un podcast
async function postPodcast(req, res) {
  const { title, description, author, topic, imageUrl } = req.body;
  try {
    const newPodcast = await Podcast.create({
      title,
      description,
      author,   
      topic,
      imageUrl
    });
    res.json(newPodcast);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}


// route exportation et importation d'une image vers aws s3
async function postImagePodcast(req, res) {
  try {
    const fileContent = fs.readFileSync(req.file.path);

    const params = {
      Bucket: "evey-podcasts",
      Key: 'podcast_images/' + Date.now() + '-' + req.file.originalname,
      Body: fileContent,
      ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);

    // envoi l'URL du fichier téléchargé à votre interface React
    res.send({ url: data.Location });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
/*
    // Supprime le dossier temporaire de Multer
    rimraf(req.file.path, (err) => {
      if (err) console.error(err);
      console.log(`File removed from temporary storage. ${req.file.path}`);
    });*/
}


module.exports = {
    getAllPodcasts,
    getSixPodcastsByTopic,
    getAllPodcastsByTopic,
    getPodcastById,
    searchPodcasts,
    postPodcast,
    postImagePodcast
};