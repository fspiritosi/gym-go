const { Router } = require("express");
const { createPreferenceHandler } = require("../handlers/mercadopagoHandler")
const mercadopagoRouter = Router();

mercadopagoRouter.post("/create_preference", createPreferenceHandler);

module.exports = mercadopagoRouter;
