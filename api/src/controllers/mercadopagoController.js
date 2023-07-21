const createPreference = (description, price, quantity) => {
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
      success: "http://localhost:3000/classes",
      failure: "http://localhost:3000/prices",
      pending: "http://localhost:3000/prices",
    },
    auto_return: "approved",
  };
  return preference;
};

module.exports = {
  createPreference,
};
