 const express = require('express');
 const app = express();
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const { sequelize } = require('./src/database/model/podcast'); // Importer l'objet sequelize
 const Podcast = require('./src/database/model/podcast').Podcast; // Importer le modèle Podcast
 const User=require('./src/database/model/user').User;//Importer le model user 
 const { Op } = require('sequelize');
 const podcastRouter = require('./src/routes/podcast.route');//importer la route des podcastes 
 const userRouter=require('./src/routes/user.route');
 const cookieParser=require("cookie-parser");
require("./src/auth/authGoogle");
const passport=require("passport");
const session=require("express-session");
 const port = process.env.PORT || 5000;


 app.use(cors({ origin: 'http://localhost:3000',
 credentials: true}));








 
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cookieParser());
 app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false,
  maxAge: 2*24*60*60*1000,
}));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use('/users',userRouter);


 app.use('/podcast', podcastRouter);
 



 app.use(cors());


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
 module.exports=app;