 const express = require('express');
 const app = express();
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const { sequelize } = require('./src/database/model/podcast'); // Importer l'objet sequelize
 const Podcast = require('./src/database/model/podcast').Podcast; // Importer le modèle Podcast
 const { Op } = require('sequelize');
 const podcastRouter = require('./src/routes/podcast.route');
 const port = process.env.PORT || 5000;


 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: true }));


 app.use('/podcast', podcastRouter);
 /*-----------------------------LES REQUETES--------------------------------*/
 /*
 // Route pour récupérer tous les podcasts
 app.get('/podcasts', async (req, res) => {
   try {
     const podcasts = await Podcast.findAll();
     res.json(podcasts);
   } catch (err) {
     console.error(err);
     res.status(500).send('Erreur serveur');
   }
 });

// Route pour récupérer 6 podcasts d'un topic
app.get('/podcasts/:topic', (req, res) => {
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
});


// Route pour récupérer tous les podcasts d'un topic
app.get('/allPodcasts/:topic', (req, res) => {
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
});

// Route pour récupérer un podcast d'un id donnée
app.get('/podcast/:podcast_id', async (req, res) => {
  const podcastId = req.params.podcast_id;
  try {
    const podcastData = await Podcast.findOne({ where: { id: podcastId } });
    res.json(podcastData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la récupération du podcast.');
  }
});

// Route pour recherche des podcasts selon le nom ou l'auteur
app.get('/search/:searchTerm', async (req, res) => {
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
});
*/
 /*-----------------------------LES REQUETES--------------------------------*/
 

 // Synchronisation des modèles avec la base de données
 sequelize.sync().then(() => {
   console.log('La base de données est synchronisée.');
   // Démarrage du serveur
   app.listen(port, () => {
     console.log(`Serveur démarré sur le port ${port}`);
   });
 }).catch((err) => {
   console.error('Impossible de synchroniser la base de données :', err);
 });
 