const { Goals } = require("../db");

const putControllerById = async (id, data) => {
  try {
    const user = await Goals.findByPk(id);
    if (!user) {
      throw new Error(`${user} not found`);
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.description) {
      user.description = data.description;
    }
    if (data.hasOwnProperty("isActive")) {
      user.isActive = data.isActive;
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Erro updating ${user}`);
  }
};
module.exports = { putControllerById };
