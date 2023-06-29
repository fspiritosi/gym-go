const { Router } = require("express");
const {
  postGoals,
  putGoalsById,
  getGoals,
  getGoalsById,
} = require("../handlers/goalsHandler");
const goalsRouter = Router();

goalsRouter.get("/", getGoals);
goalsRouter.get("/:id", getGoalsById);
goalsRouter.post("/", postGoals);
goalsRouter.put("/:id", putGoalsById);

module.exports = goalsRouter;
