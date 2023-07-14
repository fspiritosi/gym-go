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
    recurringPattern: {
      type: DataTypes.ENUM,
      values: ["does not repeat", "weekly"],
      allowNull: false,
    },
    // dayOfWeek: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   values: [1, 2, 3, 4, 5, 6, 7], // Assuming Monday is the first day of the week and Sunday is the last
    //   allowNull: true, // Only for weekly recurrence
    // },
    startDate: {
      type: DataTypes.STRING, // '2018-06-01'
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true, // in case there is not recurring pattern
    },
    startTime: {
      type: DataTypes.STRING, // '19:00:00Z' Z means zero UTC offset
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quota:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  })
}