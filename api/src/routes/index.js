const { Router } = require("express");
const activitiesRouter = require("./activitiesRouter");
const goalsRouter = require("./goalsRouter");
const userRouter = require("./userRouter");
const coachesRouter = require("./coachesRouter");
const classesRouter = require("./classesRouter");


const mainRouter = Router();

mainRouter.use("/activities", activitiesRouter);
mainRouter.use("/goals", goalsRouter);
mainRouter.use("/", userRouter);
mainRouter.use("/coaches", coachesRouter);
mainRouter.use("/classes", classesRouter);


module.exports = mainRouter;
