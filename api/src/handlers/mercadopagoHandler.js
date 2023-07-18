require("dotenv").config();
const { MP_ACCESS_TOKEN } = process.env;
const { createPreference } = require("../controllers/mercadopagoController");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

const createPreferenceHandler = async (req, res) => {
  const { description, price, quantity } = req.body;
  const preference = createPreference(description, price, quantity);

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json(response.body);
    })
    .catch(function (error) {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  createPreferenceHandler,
};
