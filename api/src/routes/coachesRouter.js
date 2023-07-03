const { Router } = require("express");

const {
  getCoachesHandler,
  postCoachesHandler,
} = require("../handlers/coachesHandler");

const coachesRouter = Router()

coachesRouter.get('/', getCoachesHandler)
coachesRouter.post("/", postCoachesHandler);


module.exports = coachesRouter