require("dotenv").config();
const { MP_ACCESS_TOKEN } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

const createPreferenceHandler = async (req, res) => {
  const { description, price, quantity } = req.body;
  // Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: description,
        unit_price: Number(price),
        quantity: Number(quantity),
      },
    ],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json({
				preferenceId: response.body.id
			});
    })
    .catch(function (error) {
      res.status(400).json({ message: error });
    });
}

module.exports = {
  createPreferenceHandler
}