'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Menus', [
      {
        name: "Cheese Burger",
        price: 3.50,
        imageUrl: "https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267.jpg"
      },
      {
        name: "Gas Station Sushi",
        price: .89,
        imageUrl: "https://www.mashed.com/img/gallery/why-you-should-think-twice-about-eating-gas-station-sushi/l-intro-1649186685.jpg"
      },
      {
        name: "Ribeye Steak",
        price: 21.00,
        imageUrl: "https://thebigmansworld.com/wp-content/uploads/2023/05/ribeye-steak-recipe-500x500.jpg"
      },
      {
        name: "Lava Cake",
        price: 2.25,
        imageUrl: "https://veggieworldrecipes.com/wp-content/uploads/2022/08/lava-cake-recipe2-e1661003920983.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Menus', null, {});
  }
};
