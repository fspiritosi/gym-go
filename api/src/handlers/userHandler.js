const {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const userRegisterHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userRegisterCtrl(username, email, password);
    /* const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "1h", //1hora de vigencia
    }); */
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userLoginCtrl(email, password);
    // const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    //   expiresIn: "1h", //1hora de vigencia
    // });
    res.status(200).json(token);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const { username, email } = req.body;
    const allUsers = await getAllUsers(username, email);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  };
};

const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await getUserById(id);
    if(!userDetail) res.status(404).json({ msg: `User with id ${id} not found` });
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const updateUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await updateUserById(id, body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserById(id);
    if(!response) res.status(404).json({ msg: `User with id ${id} not found` });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
  userRegisterHandler,
  userLoginHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler
};
