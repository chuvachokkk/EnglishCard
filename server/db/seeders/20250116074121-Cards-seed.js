"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cards",
      [
        {
          english: "Dog",
          russian: "Собака",
          learned: true,
          userId: 1,
          themeId: 1,
          imagePath: "images/dog.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          english: 'Cat',
          russian: 'Кошка',
          learned: true,
          userId: 2,
          themeId: 1,
          imagePath: 'images/cat.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          english: 'Bird',
          russian: 'Птица',
          learned: true,
          userId: 3,
          themeId: 1,
          imagePath: 'images/bird.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
  },
};
