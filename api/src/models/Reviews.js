const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Reviews", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    classeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
