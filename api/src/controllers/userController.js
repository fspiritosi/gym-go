const { User } = require("../db");
const { token } = require("../utils/jwt");
const { registerEmail } = require("../utils/nodemailer");

async function userRegisterCtrl(username, email, password) {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) {
    const user = await User.create({
      username,
      email,
      password,
    });
    const newUser = token({ password: user.password });
    await registerEmail(`${email}`);
    return newUser;
  } else {
    throw new Error("Usuario existe");
    // user.set("password", undefined, { strict: false });
  }
}
async function userLoginCtrl(email) {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) throw new Error("User no existe");
  const newUser = token({ email: userFound.email });
  return newUser;
}

async function getUserCtrl() {
  const findUSer = await User.findAll();
  if (!findUSer) throw new Error({ msg: error.message });
  return findUSer;
}

async function userUpdateCtrl(id, username, email) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User no existe");
  }
  user.username = username;
  user.email = email;
  await user.save();
  return user;
}

async function userDeleteCtrl(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User does not exist");
  if (user) await user.destroy();
  return user;
}

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  getUserCtrl,
  userUpdateCtrl,
  userDeleteCtrl,
};
