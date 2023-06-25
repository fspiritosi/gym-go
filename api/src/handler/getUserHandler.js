const { getUserController } = require("../controller/getUserController");
const getUserHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const user = await getUserController(name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUserHandler,
};
