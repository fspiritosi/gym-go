const {
  createGoals,
  updateGoalsById,
  getGoalsFind,
  getGoalsByIdFind,
} = require("../controllers/goalsControllers");

const postGoals = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const newGoals = await createGoals(name, description, isActive);
    res.status(201).json(newGoals);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const putGoalsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const data = req.body;
    console.log(data);
    const userUpdate = await updateGoalsById(id, data);
    if (!userUpdate) {
      res.status(404).json(`${userUpdate} not found`);
      return;
    }
    res.status(200).json(`Successfully updated registration`);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getGoals = async (req, res) => {
  try {
    const { name } = req.query;
    const goal = await getGoalsFind(name);
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getGoalsById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await getGoalsByIdFind(id);
    if (!goal) {
      return res.status(404).json({ msg: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  postGoals,
  putGoalsById,
  getGoals,
  getGoalsById,
};
