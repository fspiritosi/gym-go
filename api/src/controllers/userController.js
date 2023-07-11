const { users, Events } = require("../db");
const { token } = require("../utils/jwt");
const { registerEmail } = require("../utils/nodemailer");

async function userRegisterCtrl(username, email, password) {
  const userFound = await users.findOne({ where: { email: email } });
  if (!userFound) {
    const user = await users.create({
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
  const userFound = await users.findOne({ where: { email: email } });
  if (!userFound) throw new Error("User no existe");
  const newUser = token({ email: userFound.email });
  return newUser;
}

const getAllUsers = async () => {
  const allUsers = await users.findAll({
    include: [
      {
        model: Events,
      }
    ]
  });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await users.findByPk(id);
  return user;
}

const updateUserById = async (id, body) => {
  const userToUpdate = await users.findByPk(id);
  if (!users) return null;
  await userToUpdate.update(body);
  return userToUpdate;
}

const deleteUserById = async (id) => {
  const userToDestroy = await users.findByPk(id);
  if (!userToDestroy) return null;
  await userToDestroy.destroy();
  const remainingUsers = await users.findAll();
  return remainingUsers;
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
