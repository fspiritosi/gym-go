const {
  getAllActivities,
  searchActivitiesByName,
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activitiesControllers.js");

const getActivitiesHandler = async (req, res) => {
  try {
    const { title } = req.query;
    const results = title ? await searchActivitiesByName(title) : await getAllActivities();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getActivityByIdHandler = async (req, res) => {
    
  const {id} = req.params; 

  try {

    const activity = await findActivityById(id);
    
    res.status(200).json(activity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createActivityHandler = async (req, res) => {
  try {
    const { title, description, image, goals } = req.body;
    const newActivity = await createActivity(title, description, image, goals);
    res.status(201).json(newActivity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, goals, isActive } = req.body;
    const updatedActivity = await updateActivity(id, title, description, image, goals, isActive);
    res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteActivity(id);
    if(!response) res.status(404).json({ msg: `Activity with id ${id} not found` });
    res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getActivitiesHandler,
  getActivityByIdHandler,
  createActivityHandler,
  updateActivityByIdHandler,
  deleteActivityByIdHandler
};
