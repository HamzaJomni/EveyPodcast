const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

// Connexion à la base de données
const sequelize = new Sequelize('evey', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // pour ne pas recréer la meme table à chaque lancement du serveur
    define: {
      timestamps: false
    },
});


// Modèle de la table Podcasts
const Podcast = sequelize.define('podcast', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync(); // Cette ligne synchronise les modèles avec la base de données


module.exports = { sequelize, Podcast };