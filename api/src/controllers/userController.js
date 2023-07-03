const { User } = require("../db");

async function userRegisterCtrl(username, email, password) {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) {
    const user = await User.create({
      username,
      email,
      password,
    });
    return user;
  } else {
    throw new Error("Usuario existe");
    // user.set("password", undefined, { strict: false });
  }
}
async function userLoginCtrl(email) {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) throw new Error("User no existe");
  return userFound;
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
  if (!user) {
    throw new Error("Delete user succesfull");
  }
  await user.destroy();
  return user;
}

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  getUserCtrl,
  userUpdateCtrl,
  userDeleteCtrl,
};

/**
 * 
 * 
 * console.log(user);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (username) {
    user.username = data.username;
  }
  if (data.email) {
    user.email = data.email;
  }
  await user.save();
  return user;
 */
