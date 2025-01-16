"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Themes",
      [
        {
          name: "Cars",
          imagePath:
            "https://avatars.mds.yandex.net/i?id=a1cb78281221b9d9030e58a076566398_l-9182360-images-thumbs&n=13",
        },
        {
          name: "Cars",
          imagePath:
            "https://avatars.mds.yandex.net/i?id=a1cb78281221b9d9030e58a076566398_l-9182360-images-thumbs&n=13",
        },
        {
          name: "Cars",
          imagePath:
            "https://avatars.mds.yandex.net/i?id=a1cb78281221b9d9030e58a076566398_l-9182360-images-thumbs&n=13",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
