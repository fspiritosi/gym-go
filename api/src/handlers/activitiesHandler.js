const {
  createActivities,
  findActivitiByName,
  putActivities,
  deleteActivities,
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

const putActivitiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, goals, difficulty, isActive } = req.body;
    const updatedActivity = await putActivities(
      id,
      title,
      description,
      image,
      goals,
      difficulty,
      isActive
    );
    res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteActivitiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const delActivitie = await deleteActivities(id);
    res.status(200).json(delActivitie);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = {
  postActivities,
  getActivitiesByName,
  putActivitiesById,
  deleteActivitiesById,
};
