'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Themes',
      [
        {
          name: 'Фрукты',
          imagePath: '/images/food.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Транспорт',
          imagePath: '/images/transport.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Животные',
          imagePath: '/images/animals.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Профессии',
          imagePath: '/images/animals.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Спорт',
          imagePath: '/images/animals.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Цвета',
          imagePath: '/images/animals.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};
