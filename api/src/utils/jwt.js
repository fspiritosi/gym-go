const jwt = require("jsonwebtoken");

const token = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  ); //expira en una hora
};

const dataToken = (token) => {
  let data;
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err) {
      console.log(`${err} al obtener la data${data}`);
    } else {
      data = decode;
    }
  });
  return data;
};

module.exports = { token, dataToken };
