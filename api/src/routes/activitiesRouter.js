const { Router } = require("express");
const activitiesRouter = Router();
const {
  postActivities,
  getActivitiesByName,
  putActivitiesById,
  deleteActivitiesById,
} = require("../handlers/activitiesHandler");

activitiesRouter.get("/", (req, res) => {
  res.status(200).send("esto es clases");
});

// activitiesRouter.get("/:name", (req, res) => {
//   const { name } = req.params;

//   res.status(200).send(`esta es la clase de: ${name}`);
// });
activitiesRouter.get("/:name", getActivitiesByName);
activitiesRouter.post("/", postActivities);
activitiesRouter.put("/:id", putActivitiesById);
activitiesRouter.delete("/:id", deleteActivitiesById);
// activitiesRouter.post("/", (req, res) => {
//   res.status(200).send("acá creo la clase");
// });

module.exports = activitiesRouter;
