const { Router } = require("express");
const {
  getAllEventsHandler,
  getEventByIdHandler,
  createEventHandler,
  updateEventByIdHandler,
  deleteEventByIdHandler,
  deleteAllEventsHandler,
} = require("../handlers/eventsHandler");

const eventsRouter = Router();

eventsRouter.get("/", getAllEventsHandler);
eventsRouter.get("/:id", getEventByIdHandler);
eventsRouter.post("/", createEventHandler);
eventsRouter.put("/:id", updateEventByIdHandler);
eventsRouter.delete("/:id", deleteEventByIdHandler);
eventsRouter.delete("/", deleteAllEventsHandler);

module.exports = eventsRouter;
