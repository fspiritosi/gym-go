const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Classes", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    }
  })
}