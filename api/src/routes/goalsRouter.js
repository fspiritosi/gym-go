const { Router } = require("express");
const { postGoals } = require("../handlers/goalsHandler");
const goalsRouter = Router();

goalsRouter.get("/", (req, res) => {
  res.status(200).send("esto es goals");
});

goalsRouter.get("/:name", (req, res) => {
  const { name } = req.params;

  res.status(200).send(`esto es goals de: ${name}`);
});

goalsRouter.post("/", postGoals);

// goalsRouter.post("/", (req, res) => {
//   res.status(200).send("acá creo las goals");
// });

module.exports = goalsRouter;
