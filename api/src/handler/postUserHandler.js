const { postUserController } = require("../controller/postUserController");
const postUserHandler = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const postUser = await postUserController({ name, description, isActive });
    res.status(200).json(postUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { postUserHandler };
