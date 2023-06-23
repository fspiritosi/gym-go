const { Router } = require("express");
const activitiesRouter = require("./activitiesRouter");
const goalsRouter = require("./goalsRouter");
const mainRouter = Router();

mainRouter.use("/activities", activitiesRouter);
mainRouter.use("/goals", goalsRouter);

module.exports = mainRouter;
