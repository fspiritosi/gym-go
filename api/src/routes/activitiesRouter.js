const { Router } = require("express");
const {
  getActivitiesHandler,
  getActivityByIdHandler,
  postActivitiesHandler,
  putActivitiesByIdHandler,
  deleteActivitiesByIdHandler,
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();

activitiesRouter.get("/", getActivitiesHandler);
activitiesRouter.get("/:id", getActivityByIdHandler);
activitiesRouter.post("/", postActivitiesHandler);
activitiesRouter.put("/:id", putActivitiesByIdHandler);
activitiesRouter.delete("/:id", deleteActivitiesByIdHandler);

module.exports = activitiesRouter;
