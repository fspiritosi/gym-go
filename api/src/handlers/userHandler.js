const {
  userRegister,
  userLogin,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const userRegisterHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userRegister(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accessToken = await userLogin(email, password);
    if (!accessToken)
      return res.status(404).json({ msg: `email ${email} not registered` });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const results = email ? await getUserByEmail(email) : await getAllUsers();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await getUserById(id);
    res.status(200).json(userDetail);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, purchase, credits, role, isActive, events } = req.body;
    const updatedUser = await updateUserById(id, username, purchase, credits, role, isActive, events);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserById(id);
    if (!response)
      return res.status(404).json({ msg: `User with id ${id} not found` });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userRegisterHandler,
  userLoginHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
