'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Results',
      [
        {
          result: 1,
          userId: 1,
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          result: 0,
          userId: 1,
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          result: 1,
          userId: 2,
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Results', null, {});
  },
};
