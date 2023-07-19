const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Orders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item: {
      type: DataTypes.JSON, // { description, price, quantity, currency }
      allowNull: false,
    },
    operationType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
