const {
  searchActivitiesByName,
  getAllActivities,
  findActivityById,
  createActivities,
  putActivities,
  deleteActivities,
} = require("../controllers/activitiesControllers.js");

const getActivitiesHandler = async (req, res) => {
  const { title } = req.query;
  try {
    const results = title ? await searchActivitiesByName(title) : await getAllActivities();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await findActivityById(id);
    res.status(200).json(activity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const postActivitiesHandler = async (req, res) => {
  try {
    const { title, description, image, goals } = req.body;
    const newActivity = await createActivities(
      title,
      description,
      image,
      goals,

      //isActive
    );
    res.status(201).json(newActivity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const putActivitiesByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, goals, isActive } = req.body;
    const updatedActivity = await putActivities(
      id,
      title,
      description,
      image,
      goals,
      isActive
    );
    res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteActivitiesByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const delActivitie = await deleteActivities(id);
    res.status(200).json(delActivitie);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getActivitiesHandler,
  getActivityByIdHandler,
  postActivitiesHandler,
  putActivitiesByIdHandler,
  deleteActivitiesByIdHandler
};
