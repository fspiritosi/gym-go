const { Router } = require("express");
const {
  getAllGoalsHandler,
  getGoalByIdHandler,
  createGoalHandler,
  updateGoalByIdHandler,
  deleteGoalByIdHandler
} = require("../handlers/goalsHandler");
const goalsRouter = Router();

goalsRouter.get("/", getAllGoalsHandler);
goalsRouter.get("/:id", getGoalByIdHandler);
goalsRouter.post("/", createGoalHandler);
goalsRouter.put("/:id", updateGoalByIdHandler);
goalsRouter.delete("/:id", deleteGoalByIdHandler);

module.exports = goalsRouter;
