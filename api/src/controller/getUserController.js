const { Sequelize } = require("sequelize");
const { Goals } = require("../db");
const getUserController = async (name) => {
  try {
    let user;
    if (name) {
      user = await Goals.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
      });
    } else {
      user = await Goals.findAll();
    }
    return user;
  } catch (error) {
    throw new Error("Error retrieving goals");
  }
};

module.exports = { getUserController };
