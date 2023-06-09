"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorClinicSpecialist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DoctorClinicSpecialist.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DoctorClinicSpecialist",
    }
  );
  return DoctorClinicSpecialist;
};
