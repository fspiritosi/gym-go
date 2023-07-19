const { Goals } = require("../db");

const getAllGoals = async () => {
  const allGoals = await Goals.findAll({
    // include: {
    //   model: Activities,
    //   attributes: ["title"],
    //   through: { attributes: [] },
    // }
  })
  return allGoals;
};

const getGoalById = async (id) => {
  const goal = await Goals.findByPk(id, {
    include: {
      model: Activities,
      attributes: ["title"],
      through: { attributes: [] },
    }
  });
  return goal;
};

const createGoal = async (name, description) => {
  const newGoal = await Goals.create({
    name,
    description,
  });
  return newGoal;
};

const updateGoalById = async (id, name, description, isActive) => {
  const goal = await Goals.findByPk(id);
  if (name) goal.name = name;
  if (description) goal.description = description;
  if (isActive) goal.isActive = isActive;
  await goal.save();
  return goal;
};

const deleteGoalById = async (id) => {
  const goal = await Goals.findByPk(id);
  if (!goal) return null;
  await goal.destroy();
  const remainingGoals = await Goals.findAll();
  return remainingGoals;
}

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoalById,
  deleteGoalById
};
