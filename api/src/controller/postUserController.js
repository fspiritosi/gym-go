const { Goals } = require("../db");
const postUserController = async (data) => {
  try {
    const { name, description } = data;
    const user = await Goals.create({ name, description });
    return user;
  } catch (error) {
    throw new Error("Error creating goal");
  }
};
module.exports = { postUserController };
