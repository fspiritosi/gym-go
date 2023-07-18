const {
  userRegister,
  userLogin,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
} = require("../controllers/userController");

const userRegisterHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userRegister(username, email, password);
    if (!newUser)
      return res
        .status(409)
        .json({ msg: `User with email ${email} already exists` });
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
    res.status(400).json({ error: error.message });
  }
};

const updateUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await updateUserById(id, body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserByEmailHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const body = req.body;
    const updatedUser = await updateUserByEmail(email, body);
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
  updateUserByEmailHandler,
  deleteUserByIdHandler,
};
