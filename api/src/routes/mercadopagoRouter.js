const { Router } = require("express");
const { createPreferenceHandler } = require("../handlers/mercadopagoHandler")
const mercadopagoRouter = Router();

mercadopagoRouter.post("/create-preference", createPreferenceHandler);

module.exports = mercadopagoRouter;
