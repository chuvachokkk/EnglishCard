'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Cards',
      [
        {
          english: 'Apple',
          russian: 'Яблоко',
          learned: false,
          userId: 1,
          themeId: 1,
          imagePath: '/images/apple.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          english: 'Banana',
          russian: 'Банан',
          learned: false,
          userId: 1,
          themeId: 1,
          imagePath: '/images/banana.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          english: 'Car',
          russian: 'Машина',
          learned: false,
          userId: 1,
          themeId: 2,
          imagePath: '/images/car.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          english: 'Dog',
          russian: 'Собака',
          learned: false,
          userId: 2,
          themeId: 3,
          imagePath: '/images/dog.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
