const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Classes", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ["easy", "medium", "hard"],
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY, // '2018-06-01'
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING, // '19:00:00Z' Z means zero UTC offset
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING, // '02:00' means 2 hours
      allowNull: false,
    },
    recurringPattern: {
      type: DataTypes.ENUM,
      values: ["does not repeat", "daily", "weekly"],
      allowNull: false,
    },
  });
};
