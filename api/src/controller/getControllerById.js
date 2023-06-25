const { Goals } = require("../db");
const getControllerById = async (id) => {
  try {
    const userId = await Goals.findByPk(id);
    if (!userId) {
      throw new Error("id does not exist");
    }
    return userId;
  } catch (error) {
    throw new Error(`Error retrieving ${userId} by ID`);
  }
};
module.exports = { getControllerById };
