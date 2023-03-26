const Podcast = require('../database/model/podcast').Podcast; // Importer le modèle Podcast
const { Op } = require('sequelize');
const { response } = require('../../api');

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
      if(!podcastData) return res.status(404).send("Erreur recuperation");
      res.status(200).json(podcastData);
      
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

module.exports = {
    getAllPodcasts,
    getSixPodcastsByTopic,
    getAllPodcastsByTopic,
    getPodcastById,
    searchPodcasts
};