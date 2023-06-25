const {
  createActivities,
  findActivitiByName,
} = require("../controllers/activitiesControllers.js");

const postActivities = async (req, res) => {
  try {
    const { title, description, image, goals, difficulty, isAcive } = req.body;
    const newActivitie = await createActivities(
      title,
      description,
      image,
      goals,
      difficulty,
      isAcive
    );
    res.status(201).json(newActivitie);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getActivitiesByName = async (req, res) => {
  try {
    const { name } = req.params;
    const getActivitie = await findActivitiByName(name);
    res.status(200).json(getActivitie);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = {
  postActivities,
  getActivitiesByName,
};
