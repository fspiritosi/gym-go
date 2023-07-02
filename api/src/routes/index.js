const { Router } = require("express");
const activitiesRouter = require("./activitiesRouter");
const goalsRouter = require("./goalsRouter");
const classesRouter = require("./classesRouter");

const mainRouter = Router();

mainRouter.use("/activities", activitiesRouter);
mainRouter.use("/goals", goalsRouter);
mainRouter.use("/classes", classesRouter);

module.exports = mainRouter;