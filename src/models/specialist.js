"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    static associate(models) {}
  }
  Specialist.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specialist",
    }
  );
  return Specialist;
};
