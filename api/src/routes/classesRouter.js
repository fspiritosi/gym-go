const { Router } = require('express')
const {
  getAllClassesHandler,
  getClassByIdHandler,
  createClassHandler,
  updateClassByIdHandler,
  deleteClassByIdHandler
} = require("../handlers/classesHandler");

const classesRouter = Router();

classesRouter.get('/', getAllClassesHandler);
classesRouter.get('/:id', getClassByIdHandler);
classesRouter.post('/', createClassHandler);
classesRouter.put('/:id', updateClassByIdHandler);
classesRouter.delete('/:id', deleteClassByIdHandler)

module.exports = classesRouter;