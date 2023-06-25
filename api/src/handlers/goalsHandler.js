const { createGoals } = require("../controllers/goalsControllers");

const postGoals = async (req, res) => {
  try {
    const { name, description, isAcive } = req.body;
    const newGoals = await createGoals(name, description, isAcive);
    res.status(201).json(newGoals);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  postGoals,
};
