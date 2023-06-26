const { Router } = require("express");
const { postGoals } = require("../handlers/goalsHandler");
const goalsRouter = Router();

const {
  getUserHandler,
  postUserHandler,
  getHandlerById,
  putHandlerById,
} = require("../handler/index");

goalsRouter.get("/", getUserHandler);
goalsRouter.get("/:id", getHandlerById);
goalsRouter.post("/", postUserHandler);
goalsRouter.put("/:id", putHandlerById);


module.exports = goalsRouter;
