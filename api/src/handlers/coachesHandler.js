const {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoachById,
  deleteCoachById
} = require('../controllers/coachesController');

const getAllCoachesHandler = async (req, res) => {
  try {
    const allCoaches = await getAllCoaches();
    res.status(200).json(allCoaches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

const getCoachByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const coach = await getCoachById(id);
    if(!coach) return res.status(404).json({ msg: `Coach with id ${id} not found` });
    res.status(200).json(coach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const createCoachHandler = async (req, res) => {
  try {
    const { firstName, lastName, profilePicture, description, education, workExperience, activities } = req.body;
    const newCoach = await createCoach(firstName, lastName, profilePicture, description, education, workExperience, activities);
    res.status(201).json(newCoach);
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
};

const updateCoachByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, profilePicture, description, education, workExperience, activities, isActive } = req.body;
    const updatedCoach = await updateCoachById(id, firstName, lastName, profilePicture, description, education, workExperience, activities, isActive);
    if(!updatedCoach) return res.status(404).json({ msg: `Coach with id ${id} not found` });
    res.status(200).json(updatedCoach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteCoachByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCoachById(id);
    if(!response) res.status(404).json({ msg: `Coach with id ${id} not found` });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
  getAllCoachesHandler,
  getCoachByIdHandler,
  createCoachHandler,
  updateCoachByIdHandler,
  deleteCoachByIdHandler
};