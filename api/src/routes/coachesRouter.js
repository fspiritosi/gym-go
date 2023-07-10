const { Router } = require("express");
const {
  getAllCoachesHandler,
  getCoachByIdHandler,
  createCoachHandler,
  updateCoachByIdHandler,
  deleteCoachByIdHandler
} = require("../handlers/coachesHandler");

const coachesRouter = Router()

coachesRouter.get("/", getAllCoachesHandler);
coachesRouter.get("/:id", getCoachByIdHandler);
coachesRouter.post("/", createCoachHandler);
coachesRouter.put("/:id", updateCoachByIdHandler);
coachesRouter.delete("/:id", deleteCoachByIdHandler);

module.exports = coachesRouter