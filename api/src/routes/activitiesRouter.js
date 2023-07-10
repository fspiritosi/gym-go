const { Router } = require("express");

const {
  getActivitiesHandler,
  getActivityByIdHandler,
  createActivityHandler,
  updateActivityByIdHandler,
  deleteActivityByIdHandler,
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();

activitiesRouter.get("/", getActivitiesHandler);
activitiesRouter.get("/:id", getActivityByIdHandler);
activitiesRouter.post("/", createActivityHandler);
activitiesRouter.put("/:id", updateActivityByIdHandler);
activitiesRouter.delete("/:id", deleteActivityByIdHandler);


module.exports = activitiesRouter;
