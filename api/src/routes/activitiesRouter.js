const { Router } = require("express");
const activitiesRouter = Router();

// activitiesRouter.get("/", (req, res) => {
//   res.status(200).send("esto es landing");
// });

activitiesRouter.get("/", (req, res) => {
  res.status(200).send("esto es clases");
});

activitiesRouter.get("/:name", (req, res) => {
  const { name } = req.query;

  res.status(200).send(`esta es la clase de: ${name}`);
});

activitiesRouter.post("/", (req, res) => {
  res.status(200).send("acá creo la clase");
});

module.exports = activitiesRouter;
