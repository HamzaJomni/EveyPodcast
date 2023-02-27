/*
const express=require("express");
const app=express();//creation d'une istance express
const cors=require('cors');//middleware utlise les requettes HTTP pour specifier à un site web quel requete va etre accepte 
const bodyParser=require("body-parser");//pour parser ou analyser les donnees de type urlencoded


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/api/get",(req,res)=>{
    const sqlSelect="SELECT * FROM evey.podcast ";
    db.query(sqlSelect,(err,result)=>{res.send(result)});
 })
 app.listen(3003,()=>console.log("listening to port 3003"));
 */
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const { sequelize } = require('./models'); // Importer l'objet sequelize
 const Podcast = require('./models').Podcast; // Importer le modèle Podcast
 const port = process.env.PORT || 5000;


 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 
 // Route pour récupérer tous les podcasts
 app.get('/data', async (req, res) => {
   try {
     const podcasts = await Podcast.findAll();
     res.json(podcasts);
   } catch (err) {
     console.error(err);
     res.status(500).send('Erreur serveur');
   }
 });
 
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
 