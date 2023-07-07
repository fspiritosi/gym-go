const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Events", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATEONLY, // '2018-06-01'
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING, // '19:00:00Z' Z means zero UTC offset
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING, // '02:00' means 2 hours
      allowNull: false,
    },
    eventQuota: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};