const { Router } = require('express')
const {
  getClasesHandler,
  postClassesHandler,
  putClassesHandler,
  deleteClassesHandler
} = require("../handlers/classesHandler");



const classesRouter = Router();

classesRouter.get('/', getClasesHandler);
classesRouter.post('/', postClassesHandler);
classesRouter.put('/:id', putClassesHandler);
classesRouter.delete('/:id', deleteClassesHandler)


module.exports = classesRouter