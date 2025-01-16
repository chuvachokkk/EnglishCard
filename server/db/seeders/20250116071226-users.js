'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Ivan',
          password: 'hashed_password_here',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Maria',
          password: 'hashed_password_here',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
