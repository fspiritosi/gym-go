const { Router } = require("express");
const activitiesRouter = require("./activitiesRouter");
const goalsRouter = require("./goalsRouter");
const coachesRouter = require("./coachesRouter");
const classesRouter = require("./classesRouter");
const eventsRouter = require("./eventsRouter");
const userRouter = require("./userRouter");
const mercadopagoRouter = require("./mercadopagoRouter");

const mainRouter = Router();

mainRouter.use("/activities", activitiesRouter);
mainRouter.use("/goals", goalsRouter);
mainRouter.use("/coaches", coachesRouter);
mainRouter.use("/classes", classesRouter);
mainRouter.use("/events", eventsRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/mercadopago", mercadopagoRouter);

module.exports = mainRouter;
