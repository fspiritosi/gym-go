const { Activities, Goals } = require("../db");

const createGoals = async (name, description, isActive) => {
  const newGoals = await Goals.create({
    name,
    description,
    isActive,
  });
  return newGoals;
};

module.exports = {
  createGoals,
};
