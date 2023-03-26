const { Sequelize } = require('sequelize');

// Connexion à la base de données
const sequelize = new Sequelize('evey', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // pour ne pas recréer la meme table à chaque lancement du serveur
    define: {
      timestamps: false
    },
});


// Exporter l'instance Sequelize pour l'utiliser dans d'autres fichiers
module.exports = sequelize;