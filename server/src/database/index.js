const { Sequelize } = require('sequelize');

require('dotenv').config();

const db = process.env.db || 'evey'; /*eveytest*/
const user = process.env.user || 'root';
const password = process.env.password || '12345';
const host = process.env.host || 'localhost';
const dialect = process.env.dialect|| 'mysql';

// Connexion à la base de données
const sequelize = new Sequelize( db, user, password, {
    host: host,
    dialect: dialect,
    logging: false, // pour ne pas recréer la meme table à chaque lancement du serveur
});

// Exporter l'instance Sequelize pour l'utiliser dans d'autres fichiers
module.exports = sequelize;