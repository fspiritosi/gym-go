const {getAllClasses, createClasses, putClasses, deleteClasses} = require('../controllers/classesController')

const getClasesHandler = async (req, res) => {
    try {
        const classes = await getAllClasses();
        res.status(200).json(classes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const postClassesHandler = async (req, res) => {
    try {
        const {
          difficulty,
          startDate,
          startTime,
          duration,
          recurringPattern,
          ActivityId,
        //   CoachId,
        } = req.body;
        const newClass = await createClasses(
          difficulty,
          startDate,
          startTime,
          duration,
          recurringPattern,
          ActivityId,
        //   CoachId
        );
        res.status(200).json(newClass)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const putClassesHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const { difficulty, startDate, startTime, duration, recurringPattern } = req.body;
        const updatedClass = await putClasses(
            id,
            difficulty,
            startDate,
            startTime,
            duration, 
            recurringPattern
        )
        res.status(200).json(updatedClass);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const deleteClassesHandler = async (req, res) => {
    try {
        const {id} = req.params
        const deleteClass = await deleteClasses(id);
        res.status(200).json(deleteClass);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

module.exports = { getClasesHandler, postClassesHandler, putClassesHandler, deleteClassesHandler };