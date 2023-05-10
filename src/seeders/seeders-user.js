"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "huyhoangminh@gmail.com",
        password: "Minh1234",
        firstName: "Minh",
        lastName: "Le",
        address: "28 Sông Thao",
        gender: 1,
        roleId: "R1",
        phoneNumber: "",
        positionId: "",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
