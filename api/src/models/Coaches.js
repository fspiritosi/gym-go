const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Coaches", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    workExperience: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};