const jwt = require("jsonwebtoken");
const {
  userRegisterCtrl,
  userLoginCtrl,
  getUserCtrl,
  userUpdateCtrl,
  userDeleteCtrl,
} = require("../controllers/userController");
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userRegisterCtrl(username, email, password);
    // const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
    //   expiresIn: "1h", //24horas
    // });
    res.status(200).json( newUser );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userLoginCtrl(email, password);
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, //24horas
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await getUserCtrl(username, email);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const user = await userUpdateCtrl(userId, username, email);
    res.status(200).json({ msg: "User update", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const user = await userDeleteCtrl(userId, username, email);
    res.status(200).json({ msg: "User update", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { userRegister, userLogin, getUser, userUpdate, userDelete };
