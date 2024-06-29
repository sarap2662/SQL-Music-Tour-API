'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      band_id: {
        type: Sequelize.INTEGER
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
        allowNull: false,
      },
      genre: {
        type: Sequelize.TEXT
        allowNull: false,
      },
      available_start_time: {
        type: Sequelize.DATE
        allowNull: false,
      },
      end_time: {
        type: Sequelize.DATE
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bands');
  }
};