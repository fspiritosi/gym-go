const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Reviews", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataTypes.INTEGER, // beeing 1 the worst and 5 the best
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // comment: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
