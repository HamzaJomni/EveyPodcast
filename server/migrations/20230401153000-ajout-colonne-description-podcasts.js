
/*
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tracks', 'trackUrl', {
      type: Sequelize.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.sequelize.query(`UPDATE "tracks" SET "trackUrl" = "https://evey-podcasts.s3.eu-west-3.amazonaws.com/tracks_audio/1678984744240-DuoFR_S10_Trailer_4.mp3" WHERE "trackUrl" IS NULL`);
    
    await queryInterface.changeColumn('tracks', 'trackUrl', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tracks', 'trackUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('tracks', 'trackUrl');
  }
};
*/
/*
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tracks', 'trackUrl', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tracks', 'trackUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
*/