const { Router } = require("express");
const activitiesRouter = require("./activitiesRouter");
const mainRouter = Router();

mainRouter.use("/activities", activitiesRouter);

module.exports = mainRouter;
