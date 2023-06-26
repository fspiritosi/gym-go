const { Goals } = require("../db");

const createGoals = async (name, description, isActive) => {
  const newGoals = await Goals.create({
    name,
    description,
    isActive,
  });
  return newGoals;
};

const updateGoalsById = async (id, data) => {
  try {
    const goals = await Goals.findByPk(id);
    if (!goals) {
      throw new Error(`${goals} not found`);
    }
    if (data.name) {
      goals.name = data.name;
    }
    if (data.description) {
      goals.description = data.description;
    }
    if (data.hasOwnProperty("isActive")) {
      goals.isActive = data.isActive;
    }

    await goals.save();
    return goals;
  } catch (error) {
    throw new Error(`Erro updating ${goals}`);
  }
};

//solo se dejo busqueda por id, la busqueda por nombre se deshabilito
const getGoalsFind = async (name) => {
  try {
    let goals;
    if (name) {
      goals = await Goals.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
      });
    } else {
      goals = await Goals.findAll();
    }
    return goals;
  } catch (error) {
    throw new Error("Error retrieving goals");
  }
};

const getGoalsByIdFind = async (id) => {
  try {
    const goalsId = await Goals.findByPk(id);
    if (!goalsId) {
      throw new Error("id does not exist");
    }
    return goalsId;
  } catch (error) {
    throw new Error(`Error retrieving ${goalsId} by ID`);
  }
};

module.exports = {
  createGoals,
  updateGoalsById,
  getGoalsFind,
  getGoalsByIdFind,
};
