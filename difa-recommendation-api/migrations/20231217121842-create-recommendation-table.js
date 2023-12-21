'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recommendations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT, // 
        allowNull: false, // 
      },
      url_video: {
        type: Sequelize.STRING, 
        allowNull: false, 
      },

      url_image: {
        type: Sequelize.STRING, // Sesuaikan dengan tipe data yang sesuai
        allowNull: false, 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recommendations');
  },
};
