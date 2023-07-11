const {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoalById,
  deleteGoalById
} = require("../controllers/goalsControllers");

const getAllGoalsHandler = async (req, res) => {
  try {
    const allGoals = await getAllGoals();
    res.status(200).json(allGoals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGoalByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await getGoalById(id);
    if (!goal) return res.status(404).json({ msg: `Goal with id ${id}not found` });
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGoalHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGoal = await createGoal(name, description);
    res.status(201).json(newGoal);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateGoalByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    const updatedGoal = await updateGoalById(id, name, description, isActive);
    if (!updatedGoal) return res.status(404).json(`Goal with id ${id} not found`);
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteGoalByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteGoalById(id);
    if(!response) return res.status(404).json({ msg: `Goal with id ${id} not found` });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
  getAllGoalsHandler,
  getGoalByIdHandler,
  createGoalHandler,
  updateGoalByIdHandler,
  deleteGoalByIdHandler
};
