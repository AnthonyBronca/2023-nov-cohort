'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Users', [
      {
      firstName: "Anthony",
      lastName: "Bronca",
      email: "abronca@test.io",
      password: "strongPassword"
      },
      {
      firstName: "Sam",
      lastName: "Bae",
      email: "sbae@test.io",
      password: "strongPassword2"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
