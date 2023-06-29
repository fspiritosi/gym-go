const { Router } = require('express')
const {
  getClasesHandler,
  postClassesHandler,
  putClassesHandler
} = require("../handlers/classesHandler");



const classesRouter = Router();

classesRouter.get('/', getClasesHandler);
classesRouter.post('/', postClassesHandler);
classesRouter.put('/:id', putClassesHandler);


module.exports = classesRouter