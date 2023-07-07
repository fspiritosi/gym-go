const {
  getAllClasses,
	getClassById,
	createClass,
	updateClassById,
	deleteClassById
} = require('../controllers/classesController')

const getAllClassesHandler = async (req, res) => {
  try {
    const allClasses = await getAllClasses();
    res.status(200).json(allClasses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const getClassByIdHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const getClass = await getClassById(id);
		if(!getClass) res.status(404).json({ message: `Class with id ${id} not found` });
		res.status(200).json(getClass);
	} catch (error) {
		res.status(400).json({ error: error.message });
	};
};

const createClassHandler = async (req, res) => {
  try {
    const { difficulty, recurringPattern, startDate, endDate, startTime, endTime, quota, ActivityId, CoachId } = req.body;
    const newClass = await createClass(difficulty, recurringPattern, startDate, endDate, startTime, endTime, quota, ActivityId, CoachId);
    res.status(200).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const updateClassByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { difficulty, startDate, startTime, duration, recurringPattern, quota } = req.body;
    const updatedClass = await updateClassById(id, difficulty, startDate, startTime, duration, quota, recurringPattern);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteClassByIdHandler = async (req, res) => {
  try {
    const { id } = req.params
    const deleteClass = await deleteClassById(id);
    res.status(200).json(deleteClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
	getAllClassesHandler,
	getClassByIdHandler,
	createClassHandler,
	updateClassByIdHandler,
	deleteClassByIdHandler
};