const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activities", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    goals: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ["easy", "medium", "hard"],
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
